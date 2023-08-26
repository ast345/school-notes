import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import { dragDropSchedule } from './dragdropschedule';
import { createLesson} from './create_lesson.js';
import { editLesson } from './edit_lesson.js';

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;

    //ドラッグ&ドロップによる教科の入れ替え機能
    dragDropSchedule(schoolClassId);

    //leesonの新規作成機能
    createLesson(schoolClassId);

    //lessonの編集機能
    editLesson(schoolClassId);

    //複製機能を作成

    //destroy機能
    $('.delete_lesson_btn').each(function(index, element){
        const dataSet = $(element).data()
        const Id =dataSet.id
        var lessonId = dataSet.lessonId

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
            axios.delete(`/school_classes/${schoolClassId}/lessons/${lessonId}`)
            .then((res) =>{
                if(res.status === 204){
                    $(`#got_lesson${Id}`).addClass('hidden')
                    $(`#${Id}.new_lesson_btn`).removeClass('hidden')
                };
            });
        })

    });

});