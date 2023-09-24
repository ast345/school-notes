import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import { dragDropLesson } from './dragdropschedule';
import { createLesson} from './create_lesson.js';
import { editLesson } from './edit_lesson.js';
import { copyPasteLesson } from './copyPasteLesson.js';
import { event } from './event.js'
import { dateItem } from './date_item.js'
import { classLeavingTime } from './class_leaving_time.js'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()
  




document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;
    dragDropLesson(schoolClassId);
    createLesson(schoolClassId);
    editLesson(schoolClassId);
    copyPasteLesson(schoolClassId);
    
    event(schoolClassId);
    dateItem(schoolClassId);
    classLeavingTime(schoolClassId);
    
    $('.add_from_temp').on('click', (event) =>{
        const startOfWeek = $(event.currentTarget).data('startOfWeek');
        axios.get(`	/school_classes/${schoolClassId}/template_lessons/get_temp`, {
            params: {start_of_week: startOfWeek}
        })
        .then((res) =>{
            var template_lessons =res.data
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

                axios.post(`/school_classes/${schoolClassId}/lessons`, {
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
            });
        })
    });

    $(".wday_btn").on('click', () =>{
        $(".wday_select_box").slideToggle("");
    });

    $(".wday_submit_btn").on('click', () =>{
        const monday = document.getElementById('monday').checked;
        const tuesday = document.getElementById('tuesday').checked;
        const wednesday = document.getElementById('wednesday').checked;
        const thursday = document.getElementById('thursday').checked;
        const friday = document.getElementById('friday').checked;
        const saturday = document.getElementById('saturday').checked;
        const sunday = document.getElementById('sunday').checked;


        const lessonWday = gon.lesson_wday
        const startOfWeek = gon.start_of_week

        if(lessonWday === null){
            axios.post(`/school_classes/${schoolClassId}/lesson_wdays`, {
                wday: {start_of_week: startOfWeek, monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday, sunday: sunday}
            })
            .then((res) =>{
                if(res.status === 204){
                    location.reload()
                };
            });
        } else {
            axios.put(`/school_classes/${schoolClassId}/lesson_wdays/${lessonWday.id}`, {
                wday: {monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday, sunday: sunday}
            })
            .then((res) =>{
                if(res.status === 204){
                    location.reload()
                };
            });
        };
    });
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

    

    //lessonのdestroy機能
    $('.delete_lesson_btn').each(function(index, element){
        const dataSet = $(element).data()
        const Id =dataSet.id
        var lessonId = dataSet.lessonId

        const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
        const displayLessonUnit = document.getElementById(`lesson_unit${Id}`)

        //datasetが追加されたことを検知して再定義
        const deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)

        // MutationObserverのコールバック関数
        // 要素の属性変更を検知するObserverを作成
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-lesson-id') {
                    lessonId = Number(deleteLessonBtn.getAttribute('data-lesson-id'))
                }
            }
        });

        observer.observe(deleteLessonBtn, { attributes: true})
        
        $(`#delete_lesson_btn${Id}`).on('click', () =>{
            var result =window.confirm('本当に削除しますか');
            if(result === true){
                axios.delete(`/school_classes/${schoolClassId}/lessons/${lessonId}`)
                .then((res) =>{
                    if(res.status === 204){
                        $(`#got_lesson${Id}`).addClass('hidden')
                        $(`#${Id}.new_lesson_menu`).removeClass('hidden')
                        $(`#copy_lesson_btn${Id}`).addClass('hidden')
                        $(`#delete_lesson_btn${Id}`).addClass('hidden')

                        displayLessonSubject.innerHTML = ""
                        displayLessonUnit.innerHTML = ""
                    };
                });
            }
        })

    });


});