import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()



document.addEventListener('turbolinks:load', () =>{
    const dataset = $('#teacher-show').data()
    

    $('.edit_link_img').on('click', () => {
        $('.display_name_box').addClass('hidden')
        $('.edit-text-area').removeClass('hidden')
    });

    $('.edit_submit-btn').on('click', () => {
        const teacherId = dataset.teacherId
        const new_display_name = $('#edit_display_name').val()
        if (!new_display_name) {
            window.alert('表示名を入力してください')
        } else {
            axios.put(`/teachers/${teacherId}`, {
                teacher: {display_name: new_display_name}
            })
              .then((res) => {
                const teacher = res.data
                $('.edit-text-area').addClass('hidden')
                $('.display_name_box').removeClass('hidden')
                
                $('.display_name').text(teacher.display_name)
              })
        }
    })

    $('.new_display_name').on('click', () => {
        $('.new_setting').addClass('hidden')
        $('.new_text_area').removeClass('hidden')
    });

    $('.new_submit-btn').on('click', () => {
        const new_display_name = $('#new_display_name').val()
        if (!new_display_name) {
            window.alert('表示名を入力してください')
        } else {
            axios.post(`/teachers`, {
                teacher: {display_name: new_display_name}
            })
            .then((res) => {
                location.reload();
            })
        }
            
    })

});