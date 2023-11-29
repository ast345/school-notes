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
        var statusDisplay = document.getElementById('status_display')

        $(`#${Id}`+'.new_lesson_btn').on('click', () => {
            statusDisplay.innerHTML = "保存中…"
            $(`#${Id}`+'.edit_lesson_box').removeClass('hidden')
            $(`#${Id}`+'.lesson_btn_box').addClass('hidden')
            $(`#${Id}`+'.new_lesson_menu').addClass('hidden')
            $(`#${Id}.lesson_ellipsis_box`).addClass('hidden')

            selectSubject.addEventListener('change', function() {
                const selectedSubject = selectSubject.value;
                const gradeSubjectUnits = document.getElementById(`grade_subject_units${Id}`);
                const selectedSubjectIndex = selectSubject.selectedIndex;
                const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
                // 選択された科目に基づくアクションを追加
                if (selectedSubject) {
                    axios.get(`/get_grade_subject_units`, {
                        params: {grade_subject_id: selectedGradeSubjectId, school_class_id: schoolClassId}
                    })
                    .then((res) => {
                        const unitSet = res.data
                        const options = unitSet.map(unit => `<option value="${unit.id}">${unit.unit_name}</option>`).join('')
                        gradeSubjectUnits.innerHTML = `<select id="unit${Id}", class="select_unit"><option value="">&nbsp;</option>${options}</select><i class="fa-regular fa-pen-to-square unit_create_btn", id="${Id}">新しい単元名</i>`
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
                        $(`#copy_lesson_btn${Id}`).removeClass('hidden')
                        $(`#delete_lesson_btn${Id}`).removeClass('hidden')
                    };

                    //$(`#${Id}`+'.new_unit_box')がhiddenクラスを持つかどうかで条件分岐
                    var selectedSubjectName = selectSubject.value;
                    if($(`#${Id}`+'.new_unit_box').hasClass('hidden')){
                        if(selectSubject.value === ""){
                            $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                            $(`#${Id}`+'.new_lesson_menu').removeClass('hidden')
                            $(`#${Id}.lesson_ellipsis_box`).removeClass('hidden')
                            statusDisplay.innerHTML = "保存済み"
                        } else {
                            const selectedOption = selectUnit.querySelector("option:checked"); // 選択されているオプションを取得
                            const selectedUnitName = selectedOption.textContent;
                            const selectedUnitId = Number(selectUnit.value)
                            $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                            $(`#grade_subject_units${Id}`).addClass('hidden')
                            $(`#got_lesson${Id}`).removeClass('hidden')
                            $(`#${Id}.lesson_ellipsis_box`).removeClass('hidden')
                            displayLessonSubject.innerHTML = `${selectedSubjectName}`
                            displayLessonUnit.innerHTML = `${selectedUnitName}`

                            axios.post(`/school_classes/${schoolClassId}/lessons`, {
                                lesson: {date: date, day_of_week: dayOfWeek, period: period, grade_subject_unit_id: selectedUnitId, grade_subject_id: selectedGradeSubjectId}
                            })
                            .then((res) => {
                                if(res.status === 200){
                                    lessonBtnDisplay();
                                    createDataSet(res);
                                    statusDisplay.innerHTML = "保存済み"
                                };
                            })
                        }
                        document.removeEventListener('click', createEndHandler);
                    } else {
                        const newUnitName = $(`#new_unit_name${Id}`).val()
                        if (!newUnitName) {
                            window.alert('新しい単元名を入力してください')
                        } else {
                            $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                            $(`#${Id}`+'.new_unit_box').addClass('hidden')
                            $(`#got_lesson${Id}`).removeClass('hidden')
                            $(`#${Id}.lesson_ellipsis_box`).removeClass('hidden')
                            displayLessonSubject.innerHTML = `${selectedSubjectName}`
                            displayLessonUnit.innerHTML = `${newUnitName}`

                            axios.post(`/grade_subject_units`, {
                                grade_subject_unit: {unit_name: newUnitName, grade_subject_id: selectedGradeSubjectId, school_class_id : schoolClassId}
                            })
                            .then((res) => {
                                if(res.status === 200) {
                                    const createdUnitId = res.data.id
                                    axios.post(`/school_classes/${schoolClassId}/lessons`, {
                                        lesson: {date: date, day_of_week: dayOfWeek, period: period, grade_subject_unit_id: createdUnitId, grade_subject_id: selectedGradeSubjectId}
                                    })
                                    .then((res) => {
                                        if(res.status === 200){
                                            lessonBtnDisplay();
                                            createDataSet(res);
                                            statusDisplay.innerHTML = "保存済み"
                                        }
                                    })
                                }
                                document.removeEventListener('click', createEndHandler);
                            })
                            .catch(error => {
                                const res = error.response;
                                if (res.status == 422) {
                                    var gradeSubjectUnitId = res.data.duplicated_unit_id
                                    axios.post(`/school_classes/${schoolClassId}/lessons/`, {
                                        lesson: {date: date, day_of_week: dayOfWeek, period: period, grade_subject_unit_id: gradeSubjectUnitId, grade_subject_id: selectedGradeSubjectId}
                                    })
                                    .then((res) => {
                                        if(res.status === 200){
                                            lessonBtnDisplay();
                                            createDataSet(res);
                                            statusDisplay.innerHTML = "保存済み"
                                        }
                                    })
                                } else {
                                    window.alert("変更できませんでした")
                                    location.reload()
                                };
                                document.removeEventListener('click', createEndHandler);
                            });

                        }
                    };
                };
            }
            document.addEventListener('click', createEndHandler);
        });
    });

    $('.add_from_temp').on('click', (event) =>{
        var statusDisplay = document.getElementById('status_display')
        statusDisplay.innerHTML = "保存中…"
        const startOfWeek = $(event.currentTarget).data('startOfWeek');
        axios.get(`	/school_classes/${schoolClassId}/template_lessons/get_temp`, {
            params: {start_of_week: startOfWeek}
        })
        .then((res) =>{
            var template_lessons =res.data

            const axiosRequests = [];
            template_lessons.forEach(function(template_lesson){
                const period = template_lesson.period
                const date = template_lesson.date
                const Id = `${period}${date}`
                const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
                const lessonBtnDisplay = () => {
                    $(`#copy_lesson_btn${Id}`).removeClass('hidden')
                    $(`#delete_lesson_btn${Id}`).removeClass('hidden')
                    $(`#${Id}`+'.new_lesson_menu').addClass('hidden')
                };
                const createDataSet = (res) => {
                    // editに対応させるためデータセットをattribute
                    var gotLesson = document.getElementById(`got_lesson${Id}`)
                    gotLesson.setAttribute('data-subject-name', `${res.data.grade_subject_name}`)
                    gotLesson.setAttribute('data-grade-subject-id', `${res.data.grade_subject_id}`)
                    gotLesson.setAttribute('data-lesson-id', `${res.data.id}`)

                    // deleteに対応させるためのデータセットをattribute
                    var deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)
                    deleteLessonBtn.setAttribute('data-lesson-id', `${res.data.id}`)

                    // copyに対応させるためのデータセットをAttribute
                    var copyLessonBtn = document.getElementById(`copy_lesson_btn${Id}`)
                    copyLessonBtn.setAttribute('data-grade-subject-id', `${res.data.grade_subject_id}`)

                    // 入れ替えに対応させるためにデータ属性を更新
                    $(`#got_lesson${Id}`).data('subjectName', `${res.data.grade_subject_name}`)
                    $(`#got_lesson${Id}`).data('gradeSubjectId', `${res.data.grade_subject_id}`)
                    $(`#got_lesson${Id}`).data('lessonId', `${res.data.id}`);
                };

                const axiosRequest = axios.post(`/school_classes/${schoolClassId}/lessons`, {
                    lesson: {date: date, day_of_week: template_lesson.day_of_week, period: period, grade_subject_id: template_lesson.grade_subject_id}
                })
                .then((res) =>{
                    if(res.status === 200){
                        const subjectName = res.data.grade_subject_name
                        $(`#got_lesson${Id}`).removeClass('hidden')
                        displayLessonSubject.innerHTML = `${subjectName}`

                        lessonBtnDisplay();
                        createDataSet(res);
                    }
                })
                axiosRequests.push(axiosRequest);
            });


            Promise.all(axiosRequests)
            .then(() => {
                statusDisplay.innerHTML = "保存済み"
            })
            .catch((error) => {
                // エラーハンドリングを行います
                window.alert('エラーが発生しました');
            });
        })
    });
}