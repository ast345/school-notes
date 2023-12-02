import $ from 'jquery'

document.addEventListener('turbolinks:load', () =>{
    // 文字の大きさ調整
    function adjustEventFontSize(element) {
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
        adjustEventFontSize(element);
    })
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
});