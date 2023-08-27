import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import { dragDropLesson } from './dragdropschedule';
import { createLesson} from './create_lesson.js';
import { editLesson } from './edit_lesson.js';
import { copyPasteLesson} from './copyPasteLesson.js';

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;

    dragDropLesson(schoolClassId);
    createLesson(schoolClassId);
    editLesson(schoolClassId);
    copyPasteLesson(schoolClassId);

    //行事予定の追加
    $('.event_create_btn').each(function(index, element){
        const Id = element.id
        const dataSet = $(element).data()
        var date = dataSet.date
        var dayOfWeek = dataSet.dayOfWeek
        $(`#${Id}.event_create_btn`).on('click', () =>{
            $(`#${Id}.event_btn_box`).addClass('hidden')
            $(`#${Id}.event_text_box`).removeClass('hidden')

            function createEventEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.event_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var newEvent = $(`#event_text${Id}`).val();
                    
                    if (!newEvent) {
                        $(`#${Id}.event_btn_box`).removeClass('hidden')
                        $(`#${Id}.event_text_box`).addClass('hidden')
                    } else {
                        axios.post(`/school_classes/${schoolClassId}/events`, {
                            event: {date: date, day_of_week: dayOfWeek, event_name: newEvent}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                var eventName = res.event_name
                                $(`#${Id}.event_btn_box`).removeClass('hidden')
                                $(`#${Id}.event_edit_btn`).removeClass('hidden')
                                $(`#${Id}.event_create_btn`).addClass('hidden')
                                $(`#event_display${Id}`).removeClass('hidden')
                                $(`#${Id}.event_text_box`).addClass('hidden')

                                const eventDisplay = document.getElementById(`event_display${Id}`)
                                eventDisplay.innerHTML = `${res.data.event_name}`
                            }
                        });
                    };
                };
            };

            document.addEventListener('click', createEventEndHandler);
        })
    })

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