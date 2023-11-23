import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function tempMorningActivity(schoolClassId) {
    var statusDisplay = document.getElementById('status_display')
    // 文字の大きさ調整
    function adjustFontSize(element) {
        const textElem = element;
        for (let size = 30; textElem.scrollHeight > textElem.getBoundingClientRect().height && size > 1; size--) {
          textElem.style.fontSize = size + "px";
        }
      }
      
    $('.morning_act_display').each(function(index, element){
        adjustFontSize(element);
    })

    //朝活動の追加
    $('.morning_act_create_btn').each(function(index, element){
        const Id = element.id
        var dayOfWeek = $(element).data().dayOfWeek

        $(`#${Id}.morning_act_create_btn`).on('click', () =>{
            statusDisplay.innerHTML = "保存中…"
            $(`#${Id}.morning_act_btn_box`).addClass('hidden')
            $(`#${Id}.morning_act_text_box`).removeClass('hidden')
            function createMorningActEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.morning_act_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var newMorningAct = $(`#morning_act_text${Id}`).val();
                    if (!newMorningAct) {
                        $(`#${Id}.morning_act_btn_box`).removeClass('hidden')
                        $(`#${Id}.morning_act_text_box`).addClass('hidden')
                        document.removeEventListener('click', createMorningActEndHandler);
                        statusDisplay.innerHTML = "保存済み"
                    } else {
                        $(`#morning_act_display${Id}`).removeClass('hidden')
                        $(`#${Id}.morning_act_text_box`).addClass('hidden')

                        const morningActDisplay = document.getElementById(`morning_act_display${Id}`)
                        morningActDisplay.innerHTML = `${newMorningAct}`
                        adjustFontSize(morningActDisplay);

                        axios.post(`/school_classes/${schoolClassId}/template_morning_activities`, {
                            temp_morning_act: {day_of_week: dayOfWeek, activity_name: newMorningAct}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                morningActDisplay.setAttribute('data-morning-activity-id', `${res.data.id}`)
                                statusDisplay.innerHTML = "保存済み"
                            }
                        });
                        document.removeEventListener('click', createMorningActEndHandler);
                    };
                };
            };

            document.addEventListener('click', createMorningActEndHandler);
        })
    })

    // //朝活動の編集
    $(`.morning_act_display`).each(function(index, element){
        const dataSet = $(element).data()
        const Id = dataSet.id
        var morningActId = dataSet.morningActivityId
        const morningActDisplay = document.getElementById(`morning_act_display${Id}`)
        // datasetが追加されたことを検知して再定義
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-morning-activity-id') {
                    morningActId = Number(morningActDisplay.getAttribute('data-morning-activity-id'))
                }
            }
        });

        observer.observe(morningActDisplay, { attributes: true})
        $(`#morning_act_display${Id}`).on('click', () => {
            statusDisplay.innerHTML = "保存中…"
            $(this).addClass('hidden')
            $(`#${Id}.morning_act_text_box`).removeClass('hidden')
            function editMorningActEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.morning_act_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var editMorningAct = $(`#morning_act_text${Id}`).val();
                    if (!editMorningAct) {
                        $(`#${Id}.morning_act_btn_box`).removeClass('hidden')
                        $(`#${Id}.morning_act_text_box`).addClass('hidden')
                        document.removeEventListener('click', editMorningActEndHandler);

                        axios.delete(`/school_classes/${schoolClassId}/template_morning_activities/${morningActId}`)
                        .then((res) =>{
                            if(res.status === 204){
                                statusDisplay.innerHTML = "保存済み"
                            };
                        });
                    } else {
                        $(`#morning_act_display${Id}`).removeClass('hidden')
                        $(`#${Id}.morning_act_text_box`).addClass('hidden')

                        morningActDisplay.innerHTML = `${editMorningAct}`
                        adjustFontSize(morningActDisplay);
                        axios.patch(`/school_classes/${schoolClassId}/template_morning_activities/${morningActId}`, {
                            temp_morning_act: {activity_name: editMorningAct}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                statusDisplay.innerHTML = "保存済み"
                            };
                        });
                        document.removeEventListener('click', editMorningActEndHandler);
                    };

                };

            };

            document.addEventListener('click', editMorningActEndHandler);
        });
    });


}