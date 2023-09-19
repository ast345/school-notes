import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()


document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;

    // lesson_btn_boxの表示・非表示
    $('.lesson_box').each(function(index, element){
        const Id = element.id

        $(`#${Id}.lesson_box`).on('mouseenter', function(){
            $(`#${Id}.lesson_btn_box`).removeClass('hidden');
            $(`#${Id}.new_lesson_btn`).removeClass('hidden');
        }).on('mouseleave', function(){
            $(`#${Id}.lesson_btn_box`).addClass('hidden');
            $(`#${Id}.new_lesson_btn`).addClass('hidden');
        })
    });


    $('.new_lesson_btn').each(function(index, element){
        const dataset = $(element).data()
        const Id = element.id
        const period = dataset.period
        const dayOfWeek = dataset.dayOfWeek

        const selectSubject = document.getElementById(`select_subject${Id}`)
        const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)

        $(`#${Id}`+'.new_lesson_btn').on('click', () => {
            $(`#${Id}`+'.edit_lesson_box').removeClass('hidden')
            $(`#${Id}`+'.lesson_btn_box').addClass('hidden')
            $(`#${Id}`+'.new_lesson_menu').addClass('hidden')

            function createEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $('.lesson_box'+`#${Id}`);

                if (!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0) {
                    const selectedSubjectIndex = selectSubject.selectedIndex;
                    const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];

                    const createDataSet = (res) => {
                                    // editに対応させるためデータセットをattribute
                                    var gotLesson = document.getElementById(`got_lesson${Id}`)
                                    gotLesson.setAttribute('data-subject-name', `${selectSubject.value}`)
                                    gotLesson.setAttribute('data-grade-subject-id', `${res.data.grade_subject_id}`)
                                    gotLesson.setAttribute('data-template-lesson-id', `${res.data.id}`)

                                    // deleteに対応させるためのデータセットをattribute
                                    var deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)
                                    deleteLessonBtn.setAttribute('data-template-lesson-id', `${res.data.id}`)

                                    // copyに対応させるためのデータセットをAttribute
                                    var copyLessonBtn = document.getElementById(`copy_lesson_btn${Id}`)
                                    copyLessonBtn.setAttribute('data-grade-subject-id', `${res.data.grade_subject_id}`)

                                    // 入れ替えに対応させるためにデータ属性を更新
                                    $(`#got_lesson${Id}`).data('subjectName', `${selectSubject.value}`)
                                    $(`#got_lesson${Id}`).data('gradeSubjectId', `${res.data.grade_subject_id}`)
                                    $(`#got_lesson${Id}`).data('templateLessonId', `${res.data.id}`);
                    };

                    const lessonBtnDisplay = () => {
                        $(`#${Id}.lesson_btn_box`).removeClass('hidden')
                        $(`#copy_lesson_btn${Id}`).removeClass('hidden')
                        $(`#delete_lesson_btn${Id}`).removeClass('hidden')
                    };

                    if(selectSubject.value === ""){
                        $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                        $(`#${Id}`+'.new_lesson_menu').removeClass('hidden')
                    } else {
                        axios.post(`/school_classes/${schoolClassId}/template_lessons`, {
                            template_lesson: {day_of_week: dayOfWeek, period: period, grade_subject_id: selectedGradeSubjectId}
                        })
                        .then((res) => {
                            if(res.status === 200){
                                $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                                $(`#got_lesson${Id}`).removeClass('hidden')
                                displayLessonSubject.innerHTML = `${selectSubject.value}`

                                lessonBtnDisplay();
                                createDataSet(res);
                            };
                        })
                    }
                    document.removeEventListener('click', createEndHandler);
                };
            }


            document.addEventListener('click', createEndHandler);
        });

    });
});