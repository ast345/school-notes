import $ from 'jquery'

document.addEventListener('turbolinks:load', () =>{
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

    $('.item_display').each(function(index, element){
        adjustFontSize(element);
    })
});