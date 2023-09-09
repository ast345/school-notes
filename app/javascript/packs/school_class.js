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
                    };
                });
            }
        })

    });


});