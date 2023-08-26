import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function editLesson(schoolClassId) {
    $('.got_lesson').each(function(index, element){
        const dataset = $(element).data()
        const Id = dataset.id

        var SubjectName = dataset.subjectName
        var GradeSubjectId = dataset.gradeSubjectId
        var GotUnitId = dataset.gotUnitId
        var LessonId = dataset.lessonId

        const gradeSubjectUnits = document.getElementById(`grade_subject_units${Id}`)
        const selectSubject = document.getElementById(`select_subject${Id}`)

        //datasetが追加されたことを検知して再定義
        const gotLesson = document.getElementById(`got_lesson${Id}`)
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-lesson-id') {
                    SubjectName = gotLesson.getAttribute('data-subject-name')
                    GradeSubjectId= Number(gotLesson.getAttribute('data-grade-subject-id'))
                    GotUnitId = Number(gotLesson.getAttribute('data-got-unit-id'))
                    LessonId = Number(gotLesson.getAttribute('data-lesson-id'))
                }
            }
        });
        observer.observe(gotLesson, { attributes: true})
        
        $(`#lesson_subject${Id}, #lesson_unit${Id}`).on('click', () =>{
            $(`#got_lesson${Id}`).addClass('hidden')
            $(`#${Id}.edit_lesson_box`).removeClass('hidden')

            $(`#select_subject${Id} option`).each(function() {
                const optionValue = $(this).val();
                
                // value と SubjectName を比較して一致する場合、選択状態にする
                if (optionValue === SubjectName) {
                    $(this).prop('selected', true);
                }
            });

            axios.get(`/get_grade_subject_units`, {
                params: {grade_subject_id: GradeSubjectId}
            })
            .then((res) => {
                const unitSet = res.data
                const options = unitSet.map(unit => `<option value="${unit.id}">${unit.unit_name}</option>`).join('')
                $(`#grade_subject_units${Id}`).removeClass('hidden')
                gradeSubjectUnits.innerHTML = `<select id="unit${Id}"><option value="">&nbsp;</option>${options}</select><p class="new_unit_btn" id="${Id}">新規</p>`
                $(`#unit${Id} option`).each(function() {
                    const optionValue = Number($(this).val());
                    // optionValue と SubjectName を比較して一致する場合、選択状態にする
                    if (optionValue === GotUnitId) {
                        $(this).prop('selected', true);
                    }
                });

                selectSubject.addEventListener('change', function() {
                    const selectedSubject = selectSubject.value;
                    const gradeSubjectUnits = document.getElementById(`grade_subject_units${Id}`);
                    const selectedSubjectIndex = selectSubject.selectedIndex;
                    const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
                    // 選択された科目に基づく単元名の表示
                    if (selectedSubject) {
                        axios.get(`/get_grade_subject_units`, {
                            params: {grade_subject_id: selectedGradeSubjectId}
                        })
                        .then((res) => {
                            const unitSet = res.data
                            const options = unitSet.map(unit => `<option value="${unit.id}">${unit.unit_name}</option>`).join('')
                            gradeSubjectUnits.innerHTML = `<select id="unit${Id}"><option value="">&nbsp;</option>${options}</select><p class="new_unit_btn" id="${Id}">新規</p>`
    
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                    };
                });

                $(`#${Id}`+'.new_unit_btn').on('click', () =>{
                    $(`#${Id}`+'.new_unit_box').removeClass('hidden')
                    $('.unit_select_box').addClass('hidden')
                });

                $(`#${Id}`+'.cancel_btn').on('click', () => {
                    $(`#${Id}`+'.new_unit_box').addClass('hidden')
                    $('.unit_select_box').removeClass('hidden')
                });

                document.addEventListener('click', editEndHandler);
            });



        });

        function editEndHandler(event) {
            const clickedElement = event.target;
            const creatingElement = $('.lesson_box'+`#${Id}`);

            const selectSubject = document.getElementById(`select_subject${Id}`)
            const selectedSubjectIndex = selectSubject.selectedIndex;
            const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
            const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
            const displayLessonUnit = document.getElementById(`lesson_unit${Id}`)
            
            if (!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0) {
                const selectUnit = document.getElementById(`unit${Id}`)
                const selectedOption = selectUnit.querySelector("option:checked");
                if($(`#${Id}`+'.new_unit_box').hasClass('hidden')){
                    // 単元名が新規作成されていない時の処理
                    const selectedUnitName = selectedOption.textContent;
                    const selectedUnitId = Number(selectUnit.value)
                    axios.put(`/school_classes/${schoolClassId}/lessons/${LessonId}`, {
                        lesson: {grade_subject_unit_id: selectedUnitId, grade_subject_id: selectedGradeSubjectId}
                    })
                    .then((res) =>{
                        $(`#grade_subject_units${Id}`).addClass('hidden')
                        $(`#${Id}.edit_lesson_box`).addClass('hidden')
                        $(`#got_lesson${Id}`).removeClass('hidden')
                        // 中身を差し替え
                        displayLessonSubject.innerHTML = `${selectSubject.value}`
                        displayLessonUnit.innerHTML = `${selectedUnitName}`
                        
                        // 再変更のために定義変更
                        SubjectName = `${selectSubject.value}`
                        GotUnitId = res.data.grade_subject_unit_id
                        GradeSubjectId = res.data.grade_subject_id

                    });
                    document.removeEventListener('click', editEndHandler)
                } else {
                    // 単元名が新規作成されている時の処理
                    const newUnitName = $(`#new_unit_name${Id}`).val()
                    if (!newUnitName) {
                        window.alert('新しい単元名を入力してください')
                    } else {
                        axios.post(`/grade_subject_units`, {
                            grade_subject_unit: {unit_name: newUnitName, grade_subject_id: selectedGradeSubjectId}
                        })
                        .then((res) => {
                            const createdUnitId = res.data.id
                            axios.put(`/school_classes/${schoolClassId}/lessons/${LessonId}`, {
                                lesson: {grade_subject_unit_id: createdUnitId, grade_subject_id: selectedGradeSubjectId}
                            })
                            .then((res) => {
                                $(`#${Id}.edit_lesson_box`).addClass('hidden')
                                $(`#${Id}`+'.new_unit_box').addClass('hidden')
                                $(`#got_lesson${Id}`).removeClass('hidden')

                                displayLessonSubject.innerHTML = `${selectSubject.value}`
                                displayLessonUnit.innerHTML = `${newUnitName}`

                                SubjectName = `${selectSubject.value}`
                                GotUnitId = res.data.grade_subject_unit_id
                                GradeSubjectId = res.data.grade_subject_id
                            })
                        })

                        document.removeEventListener('click', editEndHandler);
                    }
                };
            };
        }
    });

};