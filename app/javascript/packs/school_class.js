import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import { dragDropLesson } from './dragdropschedule';
import { createLesson} from './create_lesson.js';
import { editLesson } from './edit_lesson.js';
import { copyPasteLesson } from './copyPasteLesson.js';
import { event } from './event.js'
import { dateItem } from './date_item.js'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;

    dragDropLesson(schoolClassId);
    createLesson(schoolClassId);
    editLesson(schoolClassId);
    copyPasteLesson(schoolClassId);

    event(schoolClassId);
    dateItem(schoolClassId);

    //下校時刻の追加
    $('.leaving_time_select_box').each(function(index, element){
        const Id = element.id
        const dataSet = $(element).data()
        var date = dataSet.date
        var dayOfWeek = dataSet.dayOfWeek

        $(`#${Id}.leaving_time_create_btn`).on('click', () =>{
            $(`#${Id}.leaving_time_btn_box`).addClass('hidden')
            $(`#${Id}.leaving_time_select_box`).removeClass('hidden')
            function createLeavingTimeEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.leaving_time_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var newTimeH = $(`select#leaving_time${Id}[name="leaving_time[time_select(4i)]"]`).val()
                    var newTimeM = $(`select#leaving_time${Id}[name="leaving_time[time_select(5i)]"]`).val()
                    if(!newTimeH && !newTimeM) {
                        $(`#${Id}.leaving_time_btn_box`).removeClass('hidden')
                        $(`#${Id}.leaving_time_select_box`).addClass('hidden')
                        document.removeEventListener('click', createLeavingTimeEndHandler);
                    } else if(!newTimeH || !newTimeM){
                        window.alert("時刻を選択してください")
                    } else {
                        axios.post(`/school_classes/${schoolClassId}/class_leaving_time`, {
                            time: {date: date, day_of_week: dayOfWeek, leaving_time: `${newTimeH}:${newTimeM}`}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                $(`#${Id}.leaving_time_select_box`).addClass('hidden')
                                $(`#leaving_time_display${Id}`).removeClass('hidden')
                                const leavingTimeDisplay = document.getElementById(`leaving_time_display${Id}`)
                                const leavingTime = new Date(res.data.leaving_time).toISOString().substr(11, 5)
                                leavingTimeDisplay.innerHTML = leavingTime
                                leavingTimeDisplay.setAttribute('data-leaving-time-id', `${res.data.id}`)
                            }
                        });
                        document.removeEventListener('click', createLeavingTimeEndHandler);
                    }
                };
            };

            document.addEventListener('click', createLeavingTimeEndHandler);

        });
    });

    //下校時刻の編集
    $(`.leaving_time_display`).each(function(index, element){
        const dataSet = $(element).data()
        const Id = dataSet.id
        var classLeavingTimeId = dataSet.leavingTimeId
        const leavingTimeDisplay = document.getElementById(`leaving_time_display${Id}`)

        //datasetが追加されたことを検知して再定義
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-leaving-time-id') {
                    classLeavingTimeId = Number(leavingTimeDisplay.getAttribute('data-leaving-time-id'))
                }
            }
        });

        observer.observe(leavingTimeDisplay, { attributes: true})

        $(`#leaving_time_display${Id}`).on('click', () => {
            $(this).addClass('hidden')
            $(`#${Id}.leaving_time_select_box`).removeClass('hidden')

            function editLeavingTimeEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.leaving_time_box`);

                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var newTimeH = $(`select#leaving_time${Id}[name="leaving_time[time_select(4i)]"]`).val()
                    var newTimeM = $(`select#leaving_time${Id}[name="leaving_time[time_select(5i)]"]`).val()
                    if(!newTimeH && !newTimeM) {
                        $(`#${Id}.leaving_time_btn_box`).removeClass('hidden')
                        $(`#${Id}.leaving_time_select_box`).addClass('hidden')
                        document.removeEventListener('click', editLeavingTimeEndHandler);
                    } else if(!newTimeH || !newTimeM){
                        window.alert("時刻を選択してください")
                    } else {
                        axios.put(`/school_classes/${schoolClassId}/class_leaving_time/${classLeavingTimeId}`, {
                            time: {leaving_time: `${newTimeH}:${newTimeM}`}
                        })
                        .then((res) =>{
                            $(`#${Id}.leaving_time_select_box`).addClass('hidden')
                            $(`#leaving_time_display${Id}`).removeClass('hidden')
                            const leavingTimeDisplay = document.getElementById(`leaving_time_display${Id}`)
                            const leavingTime = new Date(res.data.leaving_time).toISOString().substr(11, 5)
                            leavingTimeDisplay.innerHTML = leavingTime
                        });
                        document.removeEventListener('click', editLeavingTimeEndHandler);
                    };
                };
            };
            document.addEventListener('click', editLeavingTimeEndHandler);
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