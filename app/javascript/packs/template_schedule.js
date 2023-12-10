import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import {tempLessonCUD} from './temp_lesson_cud'
import {copyPasteTemplateLesson} from './tempLessonCP'
import {dragDropTempLesson} from './temp_lesson_dd.js'
import {tempMorningActivity} from './temp_morning_act.js'
import {tempItem} from './temp_item.js'
import {tempLeavingTime} from './temp_leav_t.js'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()


document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;

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
    
    tempLessonCUD(schoolClassId)
    copyPasteTemplateLesson(schoolClassId)
    dragDropTempLesson(schoolClassId)
    tempMorningActivity(schoolClassId)
    tempItem(schoolClassId)
    tempLeavingTime(schoolClassId)

});

