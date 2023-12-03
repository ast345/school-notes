import $ from 'jquery'
import html2canvas from 'html2canvas'

document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;
    $(".print_btn").on('click', (event) =>{
        const startOfWeek = $(event.currentTarget).data('startOfWeek');
        const pdfPage = window.open(`/school_classes/${schoolClassId}.pdf?start_of_week=${startOfWeek}`)
        pdfPage.onload = function () {
            pdfPage.print();
        };
    })

    $(".image_download_btn").on('click', (event) =>{
        const startOfWeek = $(event.currentTarget).data('startOfWeek');
        const endOfWeek = $(event.currentTarget).data('endOfWeek');
        const className = $(event.currentTarget).data('className');
        html2canvas(document.querySelector('.class_weekly')).then(canvas =>{
            const link = document.createElement('a')
            link.href = canvas.toDataURL()
            link.download = `${className}時間割(${startOfWeek}〜${endOfWeek}).png`
            link.click()
        })
    });

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

    function checkWidth() {
        if (window.matchMedia("(max-width: 900px)").matches) {
            $('.header').css('display', 'none');
            $('.main_container').css('margin-left', '0px');
            $('.menu_btn').removeClass('hidden')
        } else {
            $('.menu_btn').addClass('hidden')
            $('.main_container').css('margin-left', '260px');
            $('.header').css('display', 'block');
        }
    }
    
    $(document).ready(function() {
        checkWidth(); // 初回の幅チェック
    
        $(window).on('resize', function() {
            checkWidth(); // ウィンドウのリサイズ時に幅チェック
        });
    });
    $('.menu_btn').on('click', (event) =>{
        $('.menu_btn').addClass('hidden');
        $('.header').css('display', 'block');
        $('.main_container').css('margin-left', '260px');
        $('.header_close_btn').removeClass('hidden')
    });

    $('.header_close_btn').on('click', (event) =>{
        $('.menu_btn').removeClass('hidden');
        $('.header').css('display', 'none');
        $('.main_container').css('margin-left', '0px');
        $('.header_close_btn').addClass('hidden')
    });
});