import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import {tempLessonCud} from './temp_lesson_cud'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()


document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;

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
    
    tempLessonCud(schoolClassId)
});

