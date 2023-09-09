import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function event(schoolClassId) {
    
    // 文字の大きさ調整
    function adjustFontSize(element) {
        const textElem = element;
        for (let size = 30; textElem.scrollHeight > textElem.getBoundingClientRect().height && size > 1; size--) {
          textElem.style.fontSize = size + "px";
        }
      }
      
    $('.event_display').each(function(index, element){
        adjustFontSize(element);
    })

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
                        document.removeEventListener('click', createEventEndHandler);
                    } else {
                        axios.post(`/school_classes/${schoolClassId}/events`, {
                            event: {date: date, day_of_week: dayOfWeek, event_name: newEvent}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                $(`#event_display${Id}`).removeClass('hidden')
                                $(`#${Id}.event_text_box`).addClass('hidden')

                                const eventDisplay = document.getElementById(`event_display${Id}`)
                                eventDisplay.innerHTML = `${res.data.event_name}`
                                eventDisplay.setAttribute('data-event-id', `${res.data.id}`)
                                adjustFontSize(eventDisplay);
                            }
                        });
                        document.removeEventListener('click', createEventEndHandler);
                    };
                };
            };

            document.addEventListener('click', createEventEndHandler);
        })
    })

    //行事予定の編集
    $(`.event_display`).each(function(index, element){
        const dataSet = $(element).data()
        const Id = dataSet.id
        var eventId = dataSet.eventId
        const eventDisplay = document.getElementById(`event_display${Id}`)

        //datasetが追加されたことを検知して再定義
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-event-id') {
                    eventId = Number(eventDisplay.getAttribute('data-event-id'))
                }
            }
        });

        observer.observe(eventDisplay, { attributes: true})
        
        $(`#event_display${Id}`).on('click', () => {
            $(this).addClass('hidden')
            $(`#${Id}.event_text_box`).removeClass('hidden')
            function editEventEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.event_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var editEvent = $(`#event_text${Id}`).val();

                    if (!editEvent) {
                        axios.delete(`/school_classes/${schoolClassId}/events/${eventId}`)
                        .then((res) =>{
                            if(res.status === 204){
                                $(`#${Id}.event_btn_box`).removeClass('hidden')
                                $(`#${Id}.event_text_box`).addClass('hidden')
                                document.removeEventListener('click', editEventEndHandler);
                            };
                        });
                    } else {
                        axios.patch(`/school_classes/${schoolClassId}/events/${eventId}`, {
                            event: {event_name: editEvent}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                var eventName = res.event_name
                                $(`#event_display${Id}`).removeClass('hidden')
                                $(`#${Id}.event_text_box`).addClass('hidden')

                                eventDisplay.innerHTML = `${res.data.event_name}`
                                debugger
                                adjustFontSize(eventDisplay);
                            };
                        });
                        document.removeEventListener('click', editEventEndHandler);
                    };

                };

            };

            document.addEventListener('click', editEventEndHandler);
        });
    });
}