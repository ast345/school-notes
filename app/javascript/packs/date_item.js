import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function dateItem(schoolClassId) {
    var statusDisplay = document.getElementById('status_display')
        // 文字の大きさ調整
        function adjustItemFontSize(element) {
            const $element = $(element);
            const rowHeight = $('.row_item').height(); // 要素の高さを取得
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

        $('.item_display').each(function(index, element){
            adjustItemFontSize(element);
        })
    $('.item_create_btn').each(function(index, element){
        const Id = element.id
        const dataSet = $(element).data()
        var date = dataSet.date
        var dayOfWeek = dataSet.dayOfWeek

        $(`#${Id}.item_create_btn`).on('click', () =>{
            statusDisplay.innerHTML = "保存中…"
            $(`#${Id}.item_btn_box`).addClass('hidden')
            $(`#${Id}.item_text_box`).removeClass('hidden')

            function createDateItemEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.item_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var newItem = $(`#item_text${Id}`).val();
                    var replacedText = newItem.replace(/\n/g, "<br>");
                    if (!newItem) {
                        $(`#${Id}.item_btn_box`).removeClass('hidden')
                        $(`#${Id}.item_text_box`).addClass('hidden')
                        document.removeEventListener('click', createDateItemEndHandler);
                        statusDisplay.innerHTML = "保存済み"
                    } else {
                        $(`#item_display${Id}`).removeClass('hidden')
                        $(`#${Id}.item_text_box`).addClass('hidden')
                        const itemDisplay = document.getElementById(`item_display${Id}`)
                        itemDisplay.innerHTML = `${replacedText}`
                        adjustItemFontSize(itemDisplay);
                        axios.post(`/school_classes/${schoolClassId}/date_items`, {
                            item: {date: date, day_of_week: dayOfWeek, item_name: newItem}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                itemDisplay.setAttribute('data-item-id', `${res.data.id}`)
                                statusDisplay.innerHTML = "保存済み"
                            }
                        });
                        document.removeEventListener('click', createDateItemEndHandler);
                    };
                };
            };

            document.addEventListener('click', createDateItemEndHandler);
        });
    });

    //持ち物の編集
    $(`.item_display`).each(function(index, element){
        const dataSet = $(element).data()
        const Id = dataSet.id
        var itemId = dataSet.dateItemId
        const itemDisplay = document.getElementById(`item_display${Id}`)
        //datasetが追加されたことを検知して再定義
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-item-id') {
                    itemId = Number(itemDisplay.getAttribute('data-item-id'))
                }
            }
        });

        observer.observe(itemDisplay, { attributes: true})
        
        $(`#item_display${Id}`).on('click', () => {
            statusDisplay.innerHTML = "保存中…"
            $(this).addClass('hidden')
            $(`#${Id}.item_text_box`).removeClass('hidden')



            function editDateItemEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.item_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var editItem = $(`#item_text${Id}`).val();
                    var replacedText = editItem.replace(/\n/g, "<br>");
                    if (!editItem) {
                        $(`#${Id}.item_btn_box`).removeClass('hidden')
                        $(`#${Id}.item_text_box`).addClass('hidden')
                        document.removeEventListener('click', editDateItemEndHandler);
                        axios.delete(`/school_classes/${schoolClassId}/date_items/${itemId}`)
                        .then((res) =>{
                            if(res.status === 204){
                                statusDisplay.innerHTML = "保存済み"
                            };
                        });
                    } else {
                        $(`#item_display${Id}`).removeClass('hidden')
                        $(`#${Id}.item_text_box`).addClass('hidden')

                        itemDisplay.innerHTML = `${replacedText}`
                        adjustItemFontSize(itemDisplay);
                        axios.patch(`/school_classes/${schoolClassId}/date_items/${itemId}`, {
                            item: {item_name: editItem}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                statusDisplay.innerHTML = "保存済み"
                            };
                        });
                        document.removeEventListener('click', editDateItemEndHandler);
                    };

                };

            };

            document.addEventListener('click', editDateItemEndHandler);
        });
    });


    $('.add_from_temp').on('click', (event) =>{
        const startOfWeek = $(event.currentTarget).data('startOfWeek');
        axios.get(`	/school_classes/${schoolClassId}/template_date_items/get_temp`, {
            params: {start_of_week: startOfWeek}
        })
        .then((res) =>{
            var template_date_items = res.data
            template_date_items.forEach(function(template_date_item){
                const date =template_date_item.date
                const Id =`${date}`
                const dayOfWeek = template_date_item.day_of_week
                const newItem = template_date_item.item_name
                const dateItemText = document.getElementById(`item_text${Id}`)

                axios.post(`/school_classes/${schoolClassId}/date_items`, {
                    item: {date: date, day_of_week: dayOfWeek, item_name: newItem}
                })
                .then((res) =>{
                    if(res.status === 200){
                        $(`#item_display${Id}`).removeClass('hidden')
                        $(`#${Id}.item_btn_box`).addClass('hidden')
                        const itemDisplay = document.getElementById(`item_display${Id}`)
                        itemDisplay.innerHTML = `${res.data.item_name}`
                        itemDisplay.setAttribute('data-item-id', `${res.data.id}`)
                        dateItemText.value = res.data.item_name
                        adjustItemFontSize(itemDisplay);
                    }
                });
            });
        });
    });
}