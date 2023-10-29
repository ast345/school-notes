import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('turbolinks:load', () =>{
    const selectGrade = document.getElementById('class_setting_grade')
    selectGrade.addEventListener('change', function(){
        const selectedGrade = selectGrade.value;
        $('.class_subjects').empty();

        axios.get(`/grade_subject`, {
            params: {grade_id: selectedGrade}
        })
        .then((res) =>{
            const subjectsData = res.data
            $('.class_subjects').append($('<h3>', {
                'text' : "担当教科と教科書を選択してください。"
            }))
            subjectsData.forEach(function(subjectData){
                var classSettingSubject = $('<div>', {
                    'class': 'class_setting_subject',
                })

                var subjectBox = $('<div>', {
                    'class': 'subject_box',
                })
                subjectBox.append($('<input>', {
                    'type': 'checkbox',
                    'checked': true,
                    'value': subjectData.grade_subject_id
                }));
                subjectBox.append($('<label>', {
                    text: subjectData.subject_name
                }));

                
                var textBooks = subjectData.text_books
                if(!textBooks.length == 0){
                    var textBookBox = $('<div>', {
                        'class': 'text_book_box',
                    })
                    var textBookSelectBox = ($('<select>', {
                        'class': 'text_book_select',
                    }))
                    textBookSelectBox.append($('<option>', {
                        'value' : ""
                    }))
                    textBooks.forEach(function(textBook){
                        textBookSelectBox.append($('<option>', {
                            'value': textBook.text_book_id,
                            'text': `${textBook.text_book_name}(${textBook.text_book_comp})`
                        }))
                    });
                    textBookBox.append(textBookSelectBox);
                    classSettingSubject.append(subjectBox, textBookBox)
                    $('.class_subjects').append(classSettingSubject);
                } else {
                    classSettingSubject.append(subjectBox)
                    
                    $('.class_subjects').append(classSettingSubject);
                }
            });
            $('.class_setting_submit_btn_box').removeClass('hidden');

        })
    })
})