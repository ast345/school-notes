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
  });
  