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
        const startOfWeek = $(event.currentTarget).data('startOfWeek');
        const pdfPage = window.open(`/school_classes/${schoolClassId}.pdf?start_of_week=${startOfWeek}`)
        pdfPage.onload = function () {
            pdfPage.print();
        };
    })

    $('.fa-calendar-plus').on('click',(event) => {
        $(".template_nav").toggleClass('hidden');
    });

    $('.fa-share').on('click', (event)=>{
        $(".link_nav").toggleClass('hidden');
    })
    $('.fa-ellipsis').on('click', (event)=>{
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
        if (!$(e.target).closest('.fa-calendar-plus').length) {
          // 追加の要素が表示されている場合は非表示にする
          $('.template_nav').addClass('hidden');
        }

        if (!$(e.target).closest('.fa-share').length) {
            // 追加の要素が表示されている場合は非表示にする
            $('.link_nav').addClass('hidden');
        }

        if (!$(e.target).closest('.fa-ellipsis').length) {
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

    $(".iframe_btn").on('click', () =>{
        $(".iframe_code_box").slideToggle("");
    });

    $(".iframe_copy_btn").on('click', () =>{
        const iframeCode = $(".iframe_code").val();
        navigator.clipboard.writeText(iframeCode)
            .catch((error) =>{
                window.alert("コピーできませんでした")
            })
    })

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
            $(`#${Id}.lesson_btn_box`).removeClass('hidden');
            $(`#${Id}.new_lesson_btn`).removeClass('hidden');
        }).on('mouseleave', function(){
            $(`#${Id}.lesson_btn_box`).addClass('hidden');
            $(`#${Id}.new_lesson_btn`).addClass('hidden');
        })
    });

    

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
            var result =window.confirm('本当に削除しますか');
            if(result === true){
                $(`#got_lesson${Id}`).addClass('hidden')
                $(`#${Id}.new_lesson_menu`).removeClass('hidden')
                $(`#copy_lesson_btn${Id}`).addClass('hidden')
                $(`#delete_lesson_btn${Id}`).addClass('hidden')

                displayLessonSubject.innerHTML = ""
                displayLessonUnit.innerHTML = ""
                statusDisplay.innerHTML = "保存中…"
                axios.delete(`/school_classes/${schoolClassId}/lessons/${lessonId}`)
                .then((res) =>{
                    if(res.status === 204){
                        statusDisplay.innerHTML = "保存済み"
                    };
                });
            }
        })

    });


});