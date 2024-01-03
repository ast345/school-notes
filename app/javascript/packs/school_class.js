import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import { dragDropLesson } from './dragdropschedule';
import { createLesson} from './create_lesson.js';
import { editLesson } from './edit_lesson.js';
import { copyPasteLesson } from './copyPasteLesson.js';
import { event } from './event.js'
import { dateItem } from './date_item.js'
import { classLeavingTime } from './class_leaving_time.js'
import { morningActivity} from './morning_activity.js'
import html2canvas from 'html2canvas'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()
  




document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;
    dragDropLesson(schoolClassId);
    createLesson(schoolClassId);
    editLesson(schoolClassId);
    copyPasteLesson(schoolClassId);
    morningActivity(schoolClassId);
    
    event(schoolClassId);
    dateItem(schoolClassId);
    classLeavingTime(schoolClassId);

    $(".print_btn").on('click', (event) =>{
        var tableTitle = $(".print_btn").data("tableTitle")
        var printArea = document.getElementsByClassName("table_box")

        //プリント用の要素「#print」を作成し、上で取得したprintAreaをその子要素に入れる。
        $('body').append('<div id="print" class="printBc"></div>');
        $('#print').append(`<p class="table_title">${tableTitle}</p>`);
        $(printArea).clone().appendTo('#print');

        //プリントしたいエリア意外に、非表示のcssが付与されたclassを追加
        $('body > :not(#print)').addClass('print-off');


        window.print()

        //window.print()を実行した後、作成した「#print」と、非表示用のclass「print-off」を削除
        $('#print').remove();
        $('.print-off').removeClass('print-off');
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
        $('.header_close_btn').removeClass('hidden');
    });

    $('.header_close_btn').on('click', (event) =>{
        $('.menu_btn').removeClass('hidden');
        $('.header').css('display', 'none');
        $('.main_container').css('margin-left', '0px');
        $('.header_close_btn').addClass('hidden')
    });

    $('.temp_nav_btn').on('click',(event) => {
        $(".template_nav").toggleClass('hidden');
    });

    $('.fa-share').on('click', (event)=>{
        $(".link_nav").toggleClass('hidden');
    })
    $('.others_nav_btn').on('click', (event)=>{
        $(".others_nav").toggleClass('hidden');
    })
    $('.period_setting').on('click', (event)=>{
        $(".lesson_period_box").toggleClass('hidden')
    })
    $('.lesson_period_box').on('click', (e)=>{
        e.stopPropagation();
    })
    $('.wday_setting').on('click', (event)=>{
        $(".wday_select_box").toggleClass('hidden')
    })
    $(".wday_select_box").on('click', (e)=>{
        e.stopPropagation();
    })

    $(document).on("click", (e)=> {
        if (!$(e.target).closest('.temp_nav_btn').length) {
          // 追加の要素が表示されている場合は非表示にする
          $('.template_nav').addClass('hidden');
        }

        if (!$(e.target).closest('.fa-share').length) {
            // 追加の要素が表示されている場合は非表示にする
            $('.link_nav').addClass('hidden');
        }

        if (!$(e.target).closest('.others_nav_btn').length) {
            // 追加の要素が表示されている場合は非表示にする
            $('.others_nav').addClass('hidden');
        }

        if (!$(e.target).closest('.period_setting').length) {
            // 追加の要素が表示されている場合は非表示にする
            $('.lesson_period_box').addClass('hidden');
        }

        if (!$(e.target).closest('.wday_setting').length) {
            // 追加の要素が表示されている場合は非表示にする
            $('.wday_select_box').addClass('hidden');
        }

      });

    $(".share_for_stu").on("click", (event)=>{
        const url = $(event.currentTarget).data('link');
        navigator.clipboard.writeText(url)
            .then(()=>{
                alert("クリップボードに児童・生徒向け共有urlをコピーしました!");
            })
            .catch((error) =>{
                alert("urlをコピーできませんでした")
            })
    });

    $(".share_for_tea").on("click", (event)=>{
        const url = $(event.currentTarget).data('link');
        navigator.clipboard.writeText(url)
            .then(()=>{
                alert("クリップボードに先生向け共有urlをコピーしました!");
            })
            .catch((error) =>{
                alert("urlをコピーできませんでした")
            })
    });
    $(".share_for_web").on("click", (event)=>{
        const url = $(event.currentTarget).data('code');
        navigator.clipboard.writeText(url)
            .then(()=>{
                alert("クリップボードにiframeコードをコピーしました!");
            })
            .catch((error) =>{
                alert("urlをコピーできませんでした")
            })
    })


    $(".image_btn").on('click', (event) =>{
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


    $(".wday_btn").on('click', () =>{
        $(".wday_select_box").slideToggle("");
    });

    $(".wday_submit_btn").on('click', () =>{
        const monday = document.getElementById('monday').checked;
        const tuesday = document.getElementById('tuesday').checked;
        const wednesday = document.getElementById('wednesday').checked;
        const thursday = document.getElementById('thursday').checked;
        const friday = document.getElementById('friday').checked;
        const saturday = document.getElementById('saturday').checked;
        const sunday = document.getElementById('sunday').checked;


        const lessonWday = gon.lesson_wday
        const startOfWeek = gon.start_of_week

        if(lessonWday === null){
            axios.post(`/school_classes/${schoolClassId}/lesson_wdays`, {
                wday: {start_of_week: startOfWeek, monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday, sunday: sunday}
            })
            .then((res) =>{
                if(res.status === 204){
                    location.reload()
                };
            });
        } else {
            axios.put(`/school_classes/${schoolClassId}/lesson_wdays/${lessonWday.id}`, {
                wday: {monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday, sunday: sunday}
            })
            .then((res) =>{
                if(res.status === 204){
                    location.reload()
                };
            });
        };
    });
    // lesson_btn_boxの表示・非表示
    $('.lesson_box').each(function(index, element){
        const Id = element.id

        $(`#${Id}.lesson_box`).on('mouseenter', function(){
            $(`#${Id}.lesson_ellipsis`).removeClass('hidden');
            $(`#${Id}.new_lesson_btn`).removeClass('hidden');
        }).on('mouseleave', function(){
            $(`#${Id}.lesson_btn_box`).addClass('hidden');
            $(`#${Id}.new_lesson_btn`).addClass('hidden');
            $(`#${Id}.lesson_ellipsis`).addClass('hidden');
        })

        $(`#${Id}.lesson_ellipsis`).on('click', function(){
            $(`#${Id}.lesson_btn_box`).removeClass('hidden');
        })
    });
    // 教科名のフォントサイズ調整
    function adjustSubjectFZ(element) {
        const $element = $(element);
        const rowHeight = $('.row_lesson').height()/5*2 ;  // 要素の高さを取得
        const originalHTML = $element.html(); // 元のHTMLを保持
        let fontSize = parseInt($element.css('font-size')); // デフォルトのフォントサイズを取得
        let lineHeight = parseInt($element.css('line-height'));
        while (($element[0].scrollHeight > rowHeight || $element[0].getClientRects().length > 1) && fontSize > 1) {
            fontSize -= 1; // フォントサイズを1ずつ減らす（必要に応じて調整可能）
            $element.css({
                'font-size': fontSize + 'px',
                'line-height': lineHeight + 'px',
            });
        }
        $element.html(originalHTML);
    }

    function adjustUnitFZ(element) {
        const $element = $(element);
        const rowHeight = $('.row_lesson').height()/5*3 ; // 要素の高さを取得
        const originalHTML = $element.html(); // 元のHTMLを保持
        let fontSize = parseInt($element.css('font-size')); // デフォルトのフォントサイズを取得
        let lineHeight = parseInt($element.css('line-height')); // 行の高さを取得
        $element.css('white-space', 'normal'); // テキストを通常の折り返しに設定
        while ($element[0].scrollHeight > rowHeight  && fontSize > 1) {
            fontSize -= 1; // フォントサイズを1ずつ減らす（必要に応じて調整可能）
            lineHeight = Math.floor(fontSize * 1.2); // 行の高さも変更（フォントサイズに基づいて調整）
            $element.css({
                'font-size': fontSize + 'px',
                'line-height': lineHeight + 'px',
            });
        }
        $element.html(originalHTML);
    }

    $('.lesson_subject').each(function(index, element){
        adjustSubjectFZ(element);
    })
    $('.lesson_unit').each(function(index, element){
        adjustUnitFZ(element);
    })

    //lessonのdestroy機能
    $('.delete_lesson_btn').each(function(index, element){
        const dataSet = $(element).data()
        const Id =dataSet.id
        var lessonId = dataSet.lessonId

        const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
        const displayLessonUnit = document.getElementById(`lesson_unit${Id}`)

        //datasetが追加されたことを検知して再定義
        const deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)

        // MutationObserverのコールバック関数
        // 要素の属性変更を検知するObserverを作成
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-lesson-id') {
                    lessonId = Number(deleteLessonBtn.getAttribute('data-lesson-id'))
                }
            }
        });

        observer.observe(deleteLessonBtn, { attributes: true})

        var statusDisplay = document.getElementById('status_display')
        $(`#delete_lesson_btn${Id}`).on('click', () =>{
                $(`#got_lesson${Id}`).addClass('hidden')
                $(`#${Id}.new_lesson_menu`).removeClass('hidden')
                $(`#copy_lesson_btn${Id}`).addClass('hidden')
                $(`#delete_lesson_btn${Id}`).addClass('hidden')
                $(`#${Id}.lesson_box`).addClass('print_grey')

                displayLessonSubject.innerHTML = ""
                displayLessonUnit.innerHTML = ""
                statusDisplay.innerHTML = "保存中…"
                axios.delete(`/school_classes/${schoolClassId}/lessons/${lessonId}`)
                .then((res) =>{
                    if(res.status === 204){
                        statusDisplay.innerHTML = "保存済み"
                    };
                });
        });
    });
});