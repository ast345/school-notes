import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function classLeavingTime(schoolClassId) {
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
                                    $(`#${Id}.leaving_time_btn_box`).removeClass('hidden')
                                    $(`#delete_leaving_time_btn${Id}`).removeClass('hidden')
                                    $(`#${Id}.leaving_time_create_btn`).addClass('hidden')
                                    $(`#${Id}.leaving_time_select_box`).addClass('hidden')
                                    $(`#leaving_time_display${Id}`).removeClass('hidden')
                                    const leavingTimeDisplay = document.getElementById(`leaving_time_display${Id}`)
                                    const leavingTime = new Date(res.data.leaving_time).toISOString().substr(11, 5)
                                    leavingTimeDisplay.innerHTML = leavingTime
                                    leavingTimeDisplay.setAttribute('data-leaving-time-id', `${res.data.id}`)
    
                                    const deleteLeavingTimeBtn = document.getElementById(`delete_leaving_time_btn${Id}`)
                                    deleteLeavingTimeBtn.setAttribute('data-leaving-time-id', `${res.data.id}`)
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
                    axios.delete(`/school_classes/${schoolClassId}/class_leaving_time/${leavingTimeId}`)
                    .then((res) =>{
                        if(res.status === 204){
                            $(`#delete_leaving_time_btn${Id}`).addClass('hidden')
                            $(`#${Id}.leaving_time_create_btn`).removeClass('hidden')
                            $(`#leaving_time_display${Id}`).addClass('hidden')
                        };
                    })
                };
            });
        });
}