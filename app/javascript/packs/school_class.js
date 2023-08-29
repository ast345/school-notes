import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import { dragDropLesson } from './dragdropschedule';
import { createLesson} from './create_lesson.js';
import { editLesson } from './edit_lesson.js';
import { copyPasteLesson} from './copyPasteLesson.js';
import { event} from './event.js'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;

    dragDropLesson(schoolClassId);
    createLesson(schoolClassId);
    editLesson(schoolClassId);
    copyPasteLesson(schoolClassId);

    event(schoolClassId);

    // 持ち物の追加
    $('.item_create_btn').each(function(index, element){
        const Id = element.id
        const dataSet = $(element).data()
        var date = dataSet.date
        var dayOfWeek = dataSet.dayOfWeek

        $(`#${Id}.item_create_btn`).on('click', () =>{
            $(`#${Id}.item_btn_box`).addClass('hidden')
            $(`#${Id}.item_text_box`).removeClass('hidden')

            function createDateItemEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.item_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var newItem = $(`#item_text${Id}`).val();
                    if (!newItem) {
                        $(`#${Id}.item_btn_box`).removeClass('hidden')
                        $(`#${Id}.item_text_box`).addClass('hidden')
                        document.removeEventListener('click', createDateItemEndHandler);
                    } else {
                        axios.post(`/school_classes/${schoolClassId}/date_items`, {
                            item: {date: date, day_of_week: dayOfWeek, item_name: newItem}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                $(`#item_display${Id}`).removeClass('hidden')
                                $(`#${Id}.item_text_box`).addClass('hidden')
                                const itemDisplay = document.getElementById(`item_display${Id}`)
                                itemDisplay.innerHTML = `${res.data.item_name}`
                                itemDisplay.setAttribute('data-item-id', `${res.data.id}`)
                            }
                        });
                        document.removeEventListener('click', createDateItemEndHandler);
                    };
                };
            };

            document.addEventListener('click', createDateItemEndHandler);
        });
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