import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function event(schoolClassId) {
    var statusDisplay = document.getElementById('status_display')
    // 文字の大きさ調整
    function adjustFontSize(element) {
        const $element = $(element);
        const rowHeight = $('.row_event').height(); // 要素の高さを取得
        const originalHTML = $element.html(); // 元のHTMLを保持
        let fontSize = parseInt($element.css('font-size')); // デフォルトのフォントサイズを取得
        let lineHeight = parseInt($element.css('line-height')); // 行の高さを取得
        $element.css('white-space', 'normal'); // テキストを通常の折り返しに設定
    
        while (($element[0].scrollHeight > rowHeight || $element[0].getClientRects().length > 1) && fontSize > 1) {
            fontSize -= 1; // フォントサイズを1ずつ減らす（必要に応じて調整可能）
            lineHeight = Math.floor(fontSize * 1.2); // 行の高さも変更（フォントサイズに基づいて調整）
            $element.css({
                'font-size': fontSize + 'px',
                'line-height': lineHeight + 'px',
            });
        }
        $element.html(originalHTML);
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
            statusDisplay.innerHTML = "保存中…"
            $(`#${Id}.event_btn_box`).addClass('hidden')
            $(`#${Id}.event_text_box`).removeClass('hidden')

            function createEventEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.event_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var newEvent = $(`#event_text${Id}`).val();
                    var replacedText = newEvent.replace(/\n/g, "<br>");
                    if (!newEvent) {
                        $(`#${Id}.event_btn_box`).removeClass('hidden')
                        $(`#${Id}.event_text_box`).addClass('hidden')
                        document.removeEventListener('click', createEventEndHandler);
                        statusDisplay.innerHTML = "保存済み";
                    } else {
                        $(`#event_display${Id}`).removeClass('hidden')
                        $(`#${Id}.event_text_box`).addClass('hidden')
                        const eventDisplay = document.getElementById(`event_display${Id}`)
                        eventDisplay.innerHTML = `${replacedText}`
                        adjustFontSize(eventDisplay);
                        axios.post(`/school_classes/${schoolClassId}/events`, {
                            event: {date: date, day_of_week: dayOfWeek, event_name: newEvent}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                eventDisplay.setAttribute('data-event-id', `${res.data.id}`)
                                statusDisplay.innerHTML = "保存済み"
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
            statusDisplay.innerHTML = "保存中…"
            $(this).addClass('hidden')
            $(`#${Id}.event_text_box`).removeClass('hidden')

            function editEventEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.event_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var editEvent = $(`#event_text${Id}`).val();
                    var replacedText = editEvent.replace(/\n/g, "<br>");
                    var event = $(`#event_text${Id}`)
                    if (!editEvent) {
                        $(`#${Id}.event_btn_box`).removeClass('hidden')
                        $(`#${Id}.event_text_box`).addClass('hidden')
                        document.removeEventListener('click', editEventEndHandler);
                        axios.delete(`/school_classes/${schoolClassId}/events/${eventId}`)
                        .then((res) =>{
                            if(res.status === 204){
                                statusDisplay.innerHTML = "保存済み"
                            };
                        });
                    } else {
                        $(`#event_display${Id}`).removeClass('hidden')
                        $(`#${Id}.event_text_box`).addClass('hidden')

                        eventDisplay.innerHTML = `${replacedText}`
                        adjustFontSize(eventDisplay);
                        axios.patch(`/school_classes/${schoolClassId}/events/${eventId}`, {
                            event: {event_name: editEvent}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                statusDisplay.innerHTML = "保存済み"
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