import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()



document.addEventListener('turbolinks:load', () =>{
    const dataset = $('#teacher-show').data()
    const teacherId = dataset.teacherId

    $('.edit_link_img').on('click', () => {
        $('.display_name_box').addClass('hidden')
        $('.edit-text-area').removeClass('hidden')
    });

    $('.submit-btn').on('click', () => {
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

});