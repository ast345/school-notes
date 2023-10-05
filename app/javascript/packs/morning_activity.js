import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function morningActivity(schoolClassId) {
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

    //行事予定の追加
    $('.morning_act_create_btn').each(function(index, element){
        const Id = element.id
        const dataSet = $(element).data()
        var date = dataSet.date
        var dayOfWeek = dataSet.dayOfWeek

        $(`#${Id}.morning_act_create_btn`).on('click', () =>{
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
                    } else {
                        axios.post(`/school_classes/${schoolClassId}/morning_activities`, {
                            morning_act: {date: date, day_of_week: dayOfWeek, activity_name: newMorningAct}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                $(`#morning_act_display${Id}`).removeClass('hidden')
                                $(`#${Id}.morning_act_text_box`).addClass('hidden')

                                const morningActDisplay = document.getElementById(`morning_act_display${Id}`)
                                morningActDisplay.innerHTML = `${res.data.activity_name}`
                                morningActDisplay.setAttribute('data-morning-activity-id', `${res.data.id}`)
                                adjustFontSize(morningActDisplay);
                            }
                        });
                        document.removeEventListener('click', createMorningActEndHandler);
                    };
                };
            };

            document.addEventListener('click', createMorningActEndHandler);
        })
    })


}