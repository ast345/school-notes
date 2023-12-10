import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'


axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function tempLeavingTime(schoolClassId) {
    var statusDisplay = document.getElementById('status_display');
        //下校時刻の追加
        $('.leaving_time_select_box').each(function(index, element){
            const Id = element.id
            var dayOfWeek = $(element).data().dayOfWeek

            $(`#${Id}.leaving_time_create_btn`).on('click', () =>{
                statusDisplay.innerHTML = "保存中…"
                $(`#${Id}.leaving_time_create_btn_box`).addClass('hidden')
                $(`#${Id}.leaving_time_select_box`).removeClass('hidden')
                function createLeavingTimeEndHandler(event) {
                    var clickedElement = event.target;
                    var creatingElement = $(`#${Id}.leaving_time_box`);
                    if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                        var newTime = $(`#leaving_time${Id}`).val();
                        if(!newTime) {
                            $(`#${Id}.leaving_time_create_btn_box`).removeClass('hidden')
                            $(`#${Id}.leaving_time_select_box`).addClass('hidden')
                            document.removeEventListener('click', createLeavingTimeEndHandler);
                            statusDisplay.innerHTML = "保存済み"
                        } else {
                            $(`#${Id}.leaving_time_delete_btn_box`).removeClass('hidden')
                            $(`#${Id}.leaving_time_select_box`).addClass('hidden')
                            $(`#leaving_time_display${Id}`).removeClass('hidden')
                            const leavingTimeDisplay = document.getElementById(`leaving_time_display${Id}`)
                            leavingTimeDisplay.innerHTML = newTime

                            axios.post(`/school_classes/${schoolClassId}/template_class_leaving_times`, {
                                temp_time: {day_of_week: dayOfWeek, leaving_time: newTime}
                            })
                            .then((res) =>{
                                if(res.status === 200){
                                    leavingTimeDisplay.setAttribute('data-leaving-time-id', `${res.data.id}`)
    
                                    const deleteLeavingTimeBtn = document.getElementById(`delete_leaving_time_btn${Id}`)
                                    deleteLeavingTimeBtn.setAttribute('data-leaving-time-id', `${res.data.id}`)
                                    statusDisplay.innerHTML = "保存済み"
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
                statusDisplay.innerHTML = "保存中…"
                $(this).addClass('hidden')
                $(`#${Id}.leaving_time_select_box`).removeClass('hidden')
                $(`#${Id}.leaving_time_delete_btn_box`).addClass('hidden')
    
                function editLeavingTimeEndHandler(event) {
                    var clickedElement = event.target;
                    var creatingElement = $(`#${Id}.leaving_time_box`);
    
                    if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                        var newTime = $(`#leaving_time${Id}`).val();
                        if(!newTime) {
                            $(`#${Id}.leaving_time_create_btn_box`).removeClass('hidden')
                            $(`#${Id}.leaving_time_select_box`).addClass('hidden')
                            document.removeEventListener('click', editLeavingTimeEndHandler);
                            statusDisplay.innerHTML = "保存済み"
                        } else {
                            $(`#${Id}.leaving_time_select_box`).addClass('hidden')
                            $(`#leaving_time_display${Id}`).removeClass('hidden')
                            $(`#${Id}.leaving_time_delete_btn_box`).removeClass('hidden')
                            const leavingTimeDisplay = document.getElementById(`leaving_time_display${Id}`)
                            leavingTimeDisplay.innerHTML = newTime

                            axios.put(`/school_classes/${schoolClassId}/template_class_leaving_times/${classLeavingTimeId}`, {
                                temp_time: {leaving_time: newTime}
                            })
                            .then((res) =>{
                                statusDisplay.innerHTML = "保存済み"
                            });
                            document.removeEventListener('click', editLeavingTimeEndHandler);
                        };
                    };
                };
                document.addEventListener('click', editLeavingTimeEndHandler);
            });
        });
    
        //下校時刻のdestroy機能
        $('.delete_leaving_time_btn').each(function(index, element){
            const dataSet = $(element).data()
            const Id =dataSet.id
            var leavingTimeId = dataSet.leavingTimeId
    
            const deleteLeavingTimeBtn = document.getElementById(element.id)
            
            var observer = new MutationObserver(function(mutationsList) {
                for (var mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-leaving-time-id') {
                        leavingTimeId = Number(deleteLeavingTimeBtn.getAttribute('data-leaving-time-id'))
                    }
                }
            });
    
            observer.observe(deleteLeavingTimeBtn, { attributes: true})
    
            $(`#delete_leaving_time_btn${Id}`).on('click', () =>{
                var result =window.confirm('本当に削除しますか');
                if(result === true){
                    statusDisplay.innerHTML = "保存中…"
                    $(`#${Id}.leaving_time_delete_btn_box`).addClass('hidden')
                    $(`#leaving_time_display${Id}`).addClass('hidden')
                    $(`#${Id}.leaving_time_create_btn_box`).removeClass('hidden')
                    
                    axios.delete(`/school_classes/${schoolClassId}/template_class_leaving_times/${leavingTimeId}`)
                    .then((res) =>{
                        if(res.status === 204){
                            statusDisplay.innerHTML = "保存済み"
                        };
                    })
                };
            });
        });
}