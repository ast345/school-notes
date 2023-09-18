import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function createLesson(schoolClassId) {
    $('.new_lesson_btn').each(function(index, element){
        const dataset = $(element).data()
        const Id = element.id
        const period = dataset.period
        const date = dataset.date
        const dayOfWeek = dataset.dayOfWeek

        const selectSubject = document.getElementById(`select_subject${Id}`)
        const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
        const displayLessonUnit = document.getElementById(`lesson_unit${Id}`)

        $(`#${Id}`+'.new_lesson_btn').on('click', () => {
            $(`#${Id}`+'.edit_lesson_box').removeClass('hidden')
            $(`#${Id}`+'.lesson_btn_box').addClass('hidden')
            $(`#${Id}`+'.new_lesson_menu').addClass('hidden')

            selectSubject.addEventListener('change', function() {
                const selectedSubject = selectSubject.value;
                const gradeSubjectUnits = document.getElementById(`grade_subject_units${Id}`);
                const selectedSubjectIndex = selectSubject.selectedIndex;
                const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
                // 選択された科目に基づくアクションを追加
                if (selectedSubject) {
                    axios.get(`/get_grade_subject_units`, {
                        params: {grade_subject_id: selectedGradeSubjectId}
                    })
                    .then((res) => {
                        const unitSet = res.data
                        const options = unitSet.map(unit => `<option value="${unit.id}">${unit.unit_name}</option>`).join('')
                        gradeSubjectUnits.innerHTML = `<select id="unit${Id}", class="select_unit"><option value="">&nbsp;</option>${options}</select><i class="fa-regular fa-pen-to-square unit_create_btn", id="${Id}"></i>`
                        $(`#grade_subject_units${Id}`).removeClass('hidden')

                        $(`#${Id}.unit_create_btn`).on('click', () =>{
                            $(`#${Id}`+'.new_unit_box').removeClass('hidden')
                            $(`#grade_subject_units${Id}`).addClass('hidden')
                        });

                        $(`#${Id}`+'.cancel_btn').on('click', () => {
                            $(`#${Id}`+'.new_unit_box').addClass('hidden')
                            $(`#grade_subject_units${Id}`).removeClass('hidden')
                        });

                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
                };
            });

            function createEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $('.lesson_box'+`#${Id}`);

                if (!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0) {
                    const selectedSubjectIndex = selectSubject.selectedIndex;
                    const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];

                    const selectUnit = document.getElementById(`unit${Id}`);

                    const createDataSet = (res) => {
                                    // editに対応させるためデータセットをattribute
                                    var gotLesson = document.getElementById(`got_lesson${Id}`)
                                    gotLesson.setAttribute('data-subject-name', `${selectSubject.value}`)
                                    gotLesson.setAttribute('data-grade-subject-id', `${res.data.grade_subject_id}`)
                                    gotLesson.setAttribute('data-got-unit-id', `${res.data.grade_subject_unit_id}`)
                                    gotLesson.setAttribute('data-lesson-id', `${res.data.id}`)

                                    // deleteに対応させるためのデータセットをattribute
                                    var deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)
                                    deleteLessonBtn.setAttribute('data-lesson-id', `${res.data.id}`)

                                    // copyに対応させるためのデータセットをAttribute
                                    // obseverまだ
                                    var copyLessonBtn = document.getElementById(`copy_lesson_btn${Id}`)
                                    copyLessonBtn.setAttribute('data-grade-subject-id', `${res.data.grade_subject_id}`)
                                    copyLessonBtn.setAttribute('data-got-unit-id', `${res.data.grade_subject_unit_id}`)

                                    // 入れ替えに対応させるためにデータ属性を更新
                                    $(`#got_lesson${Id}`).data('subjectName', `${selectSubject.value}`)
                                    $(`#got_lesson${Id}`).data('gradeSubjectId', `${res.data.grade_subject_id}`)
                                    $(`#got_lesson${Id}`).data('gotUnitId', `${res.data.grade_subject_unit_id}`)
                                    $(`#got_lesson${Id}`).data('lessonId', `${res.data.id}`);
                    };

                    const lessonBtnDisplay = () => {
                        $(`#${Id}.lesson_btn_box`).removeClass('hidden')
                        $(`#copy_lesson_btn${Id}`).removeClass('hidden')
                        $(`#delete_lesson_btn${Id}`).removeClass('hidden')
                    };

                    //$(`#${Id}`+'.new_unit_box')がhiddenクラスを持つかどうかで条件分岐
                    if($(`#${Id}`+'.new_unit_box').hasClass('hidden')){
                        if(selectSubject.value === ""){
                            $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                            $(`#${Id}`+'.new_lesson_menu').removeClass('hidden')
                        } else {
                            const selectedOption = selectUnit.querySelector("option:checked"); // 選択されているオプションを取得
                            const selectedUnitName = selectedOption.textContent;
                            const selectedUnitId = Number(selectUnit.value)
                            axios.post(`/school_classes/${schoolClassId}/lessons`, {
                                lesson: {date: date, day_of_week: dayOfWeek, period: period, grade_subject_unit_id: selectedUnitId, grade_subject_id: selectedGradeSubjectId}
                            })
                            .then((res) => {
                                if(res.status === 200){
                                    $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                                    $(`#grade_subject_units${Id}`).addClass('hidden')
                                    $(`#got_lesson${Id}`).removeClass('hidden')
                                    displayLessonSubject.innerHTML = `${selectSubject.value}`
                                    displayLessonUnit.innerHTML = `${selectedUnitName}`

                                    lessonBtnDisplay();
                                    createDataSet(res);
                                };
                            })
                        }
                        document.removeEventListener('click', createEndHandler);
                    } else {
                        const newUnitName = $(`#new_unit_name${Id}`).val()
                        if (!newUnitName) {
                            window.alert('新しい単元名を入力してください')
                        } else {
                            axios.post(`/grade_subject_units`, {
                                grade_subject_unit: {unit_name: newUnitName, grade_subject_id: selectedGradeSubjectId}
                            })
                            .then((res) => {
                                if(res.status === 200) {
                                    const createdUnitId = res.data.id
                                    axios.post(`/school_classes/${schoolClassId}/lessons`, {
                                        lesson: {date: date, day_of_week: dayOfWeek, period: period, grade_subject_unit_id: createdUnitId, grade_subject_id: selectedGradeSubjectId}
                                    })
                                    .then((res) => {
                                        if(res.status === 200){
                                            $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                                            $(`#${Id}`+'.new_unit_box').addClass('hidden')
                                            $(`#got_lesson${Id}`).removeClass('hidden')
                                            displayLessonSubject.innerHTML = `${selectSubject.value}`
                                            displayLessonUnit.innerHTML = `${newUnitName}`
                                            lessonBtnDisplay();
                                            createDataSet(res);
                                        }
                                    })
                                }
                                document.removeEventListener('click', createEndHandler);
                            })
                            .catch(error => {
                                const errorMessage = error.response.data;
                                if (errorMessage.includes('PG::UniqueViolation')) {
                                    window.alert(`「${newUnitName}」はすでに登録されています`)
                                } else {
                                    window.alert("単元名を新しく作成できませんでした")
                                };
                            });

                        }
                    };
                };
            }


            document.addEventListener('click', createEndHandler);
        });

    });
}