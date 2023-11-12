import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

// app/assets/javascripts/grade_subject_units.js
document.addEventListener("turbolinks:load", function() {
    $('[data-remote="true"]').submit(function(e) {
      e.preventDefault();
      $.ajax({
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function(data) {
            var Id = data.id
            var unitName= document.getElementById(`${Id}`)
            unitName.innerHTML = `${data.unit_name}`
        },
        error: function() {
            window.alert("単元名を変更できませんでした")
        }
      });
    });

    $('.unit_delete_btn').each(function(index, element){
        const Id =element.id
        const dataset = $(element).data()
        const gradeSubjectUnitId = dataset.id
        $(`.unit_delete_btn#${Id}`).on('click', () =>{
            axios.delete(`/grade_subject_units/${gradeSubjectUnitId}`)
            .then((res) =>{
                if(res.status === 204){
                    var unitBox = document.getElementById(`unit_box${gradeSubjectUnitId}`);
                    unitBox.remove();
                }
            })
            .catch(error => {
                window.alert("削除できませんでした")
            })
        })
    })

    $('.add_text_book_units_btn').on('click', () =>{
        $('.new_unit_area').removeClass('hidden');
        $('.add_text_book_units_btn').addClass('hidden')
    })

    $('.new_unit_submit_btn').on('click', () =>{
        var newUnitName = $(`.new_text_unit`).val()
        var dataSet = $('.new_text_unit').data()
        var gradeSubjectId = dataSet.gradeSubjectId
        var schoolClassId = dataSet.schoolClassId
        if (!newUnitName) {
            window.alert('新しい単元名を入力してください')
        } else {
            axios.post(`/grade_subject_units`, {
                grade_subject_unit: {unit_name: newUnitName, grade_subject_id: gradeSubjectId, school_class_id : schoolClassId}
            })
            .then((res) =>{
                if(res.status === 200){
                    location.reload()
                }
            })
        }
    })
  });