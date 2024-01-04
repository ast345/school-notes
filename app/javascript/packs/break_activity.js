import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function breakActivity(schoolClassId) {
    var statusDisplay = document.getElementById('status_display')
    // 文字の大きさ調整
    function adjustFontSize(element) {
        const textElem = element;
        for (let size = 30; textElem.scrollHeight > textElem.getBoundingClientRect().height && size > 1; size--) {
          textElem.style.fontSize = size + "px";
        }
      }
      
    $('.break_act_display').each(function(index, element){
        adjustFontSize(element);
    })

    //朝活動の追加
    $('.break_act_create_btn').each(function(index, element){
        const Id = element.id
        const dataSet = $(element).data()
        var date = dataSet.date
        var dayOfWeek = dataSet.dayOfWeek

        $(`#${Id}.break_act_create_btn`).on('click', () =>{
            statusDisplay.innerHTML = "保存中…"
            $(`#${Id}.break_act_btn_box`).addClass('hidden')
            $(`#${Id}.break_act_text_box`).removeClass('hidden')
            function createBreakActEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.break_act_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var newBreakAct = $(`#break_act_text${Id}`).val();

                    if (!newBreakAct) {
                        $(`#${Id}.break_act_btn_box`).removeClass('hidden')
                        $(`#${Id}.break_act_text_box`).addClass('hidden')
                        document.removeEventListener('click', createBreakActEndHandler);
                        statusDisplay.innerHTML = "保存済み"
                    } else {
                        $(`#break_act_display${Id}`).removeClass('hidden')
                        $(`#${Id}.break_act_text_box`).addClass('hidden')
                        const breakActDisplay = document.getElementById(`break_act_display${Id}`)
                        breakActDisplay.innerHTML = `${newBreakAct}`
                        adjustFontSize(breakActDisplay);

                        axios.post(`/school_classes/${schoolClassId}/break_activities`, {
                            break_act: {date: date, day_of_week: dayOfWeek, activity_name: newBreakAct}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                breakActDisplay.setAttribute('data-break-activity-id', `${res.data.id}`)
                                statusDisplay.innerHTML = "保存済み"
                            }
                        });
                        document.removeEventListener('click', createBreakActEndHandler);
                    };
                };
            };

            document.addEventListener('click', createBreakActEndHandler);
        })
    })

    //朝活動の編集
    $(`.break_act_display`).each(function(index, element){
        const dataSet = $(element).data()
        const Id = dataSet.id
        var breakActId = dataSet.breakActivityId
        const breakActDisplay = document.getElementById(`break_act_display${Id}`)
        // datasetが追加されたことを検知して再定義
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-break-activity-id') {
                    breakActId = Number(breakActDisplay.getAttribute('data-break-activity-id'))
                }
            }
        });

        observer.observe(breakActDisplay, { attributes: true})

        $(`#break_act_display${Id}`).on('click', () => {
            statusDisplay.innerHTML = "保存中…"
            $(this).addClass('hidden')
            $(`#${Id}.break_act_text_box`).removeClass('hidden')
            function editBreakActEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.break_act_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var editBreakAct = $(`#break_act_text${Id}`).val();
                    if (!editBreakAct) {
                        $(`#${Id}.break_act_btn_box`).removeClass('hidden')
                        $(`#${Id}.break_act_text_box`).addClass('hidden')
                        document.removeEventListener('click', editBreakActEndHandler);

                        axios.delete(`/school_classes/${schoolClassId}/break_activities/${breakActId}`)
                        .then((res) =>{
                            if(res.status === 204){
                                statusDisplay.innerHTML = "保存済み"
                            };
                        });
                    } else {
                        $(`#break_act_display${Id}`).removeClass('hidden')
                        $(`#${Id}.break_act_text_box`).addClass('hidden')

                        breakActDisplay.innerHTML = `${editBreakAct}`
                        adjustFontSize(breakActDisplay);
                        axios.patch(`/school_classes/${schoolClassId}/break_activities/${breakActId}`, {
                            break_act: {activity_name: editBreakAct}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                statusDisplay.innerHTML = "保存済み"
                            };
                        });
                        document.removeEventListener('click', editBreakActEndHandler);
                    };

                };

            };

            document.addEventListener('click', editBreakActEndHandler);
        });
    });

    $('.add_from_temp').on('click', (event) =>{
        const startOfWeek = $(event.currentTarget).data('startOfWeek');
        axios.get(`	/school_classes/${schoolClassId}/template_break_activities/get_temp`, {
            params: {start_of_week: startOfWeek}
        })
        .then((res) =>{
            var template_break_acts = res.data
            template_break_acts.forEach(function(template_break_act){
                const date = template_break_act.date
                const Id = `${date}`
                const dayOfWeek = template_break_act.day_of_week
                const newBreakAct = template_break_act.activity_name
                const breakActText = document.getElementById(`break_act_text${Id}`)
                axios.post(`/school_classes/${schoolClassId}/break_activities`, {
                    break_act: {date: date, day_of_week: dayOfWeek, activity_name: newBreakAct}
                })
                .then((res) =>{
                    if(res.status === 200){
                        $(`#break_act_display${Id}`).removeClass('hidden')
                        $(`#${Id}.break_act_btn_box`).addClass('hidden')

                        const breakActDisplay = document.getElementById(`break_act_display${Id}`)
                        breakActDisplay.innerHTML = `${res.data.activity_name}`
                        breakActDisplay.setAttribute('data-break-activity-id', `${res.data.id}`)
                        breakActText.value = res.data.activity_name
                        adjustFontSize(breakActDisplay);
                    }
                });
            })
        })
    });

}