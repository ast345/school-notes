import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import {tempLessonCUD} from './temp_lesson_cud'
import {copyPasteTemplateLesson} from './tempLessonCP'
import {dragDropTempLesson} from './temp_lesson_dd.js'
import {tempMorningActivity} from './temp_morning_act.js'

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
    
    tempLessonCUD(schoolClassId)
    copyPasteTemplateLesson(schoolClassId)
    dragDropTempLesson(schoolClassId)
    tempMorningActivity(schoolClassId)

});

