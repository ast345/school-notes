import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('turbolinks:load', () =>{
    const selectGrade = document.getElementById('class_setting_grade')
    const classNameBox = document.getElementById('class_setting_name')
    selectGrade.addEventListener('change', function(){
        const selectedGrade = selectGrade.value;
        $('.class_subjects').empty();
        $('.class_setting_submit_btn_box').addClass('hidden');

        axios.get(`/grade_subject`, {
            params: {grade_id: selectedGrade}
        })
        .then((res) =>{
            const subjectsData = res.data
            $('.class_subjects').append($('<h3>', {
                'text' : "担当教科と教科書を選択してください。"
            }))
            subjectsData.forEach(function(subjectData, index){
                var classSettingSubject = $('<div>', {
                    'class': 'class_setting_subject',
                })

                var subjectBox = $('<div>', {
                    'class': 'subject_box',
                })
                subjectBox.append($('<input>', {
                    'type': 'checkbox',
                    'checked': true,
                    'value': subjectData.grade_subject_id,
                    'id': `subject_check_box${index}`
                }));
                subjectBox.append($('<label>', {
                    text: ` ${subjectData.subject_name}`
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

    $('.class_setting_submit_btn').on('click', () =>{
        var gradeClass = selectGrade.value;
        var className = classNameBox.value;

        var subjectsDataBox = []
        let emptyTextBookCount = 0;

        $('.class_setting_subject').each(function(index) {
            var subjectCheckBox = document.getElementById(`subject_check_box${index}`)
            var select = $(this).find('select');
            var textbook = select.val();
            var checkbox = $(this).find('input[type="checkbox"]');
            var subject = checkbox.val();

            // チェックボックスの状態を確認
            var isChecked = subjectCheckBox.checked;

            if(isChecked) {
                var subjectData = {
                    grade_subject_id: subject,
                    text_book_id: textbook
                };

                subjectsDataBox.push(subjectData)
                if(textbook === ''){
                    emptyTextBookCount++;
                }
            }
        });

        if(className === ''){
            window.alert("クラス名を入力してください")
        } else {
            if(!emptyTextBookCount == 0){
                window.alert("登録する教科の教科書をすべて選択してください")
            } else {
                axios.post(`/school_classes`, {
                    school_class: {grade_id: gradeClass, class_name: className},
                    subjects: {subjects_data_set: subjectsDataBox}
                })
                .then((res) =>{
                    if(res.status === 200){
                        var schoolClassId = res.data.id
                        window.location.href = `/school_classes/${schoolClassId}`
                    }
                })
            }
        };
    })

    $('.class_setting_edit_submit_btn').on('click', () =>{
        var schoolClassId = $('.class_setting_edit_submit_btn').data('school-class-id');
        var gradeClass = selectGrade.value;
        var className = classNameBox.value;

        var subjectsDataBox = []
        let emptyTextBookCount = 0;
        $('.class_setting_subject').each(function(index) {
            var subjectCheckBox = document.getElementById(`subject_check_box${index}`)
            var usingTextId = $(`#text_book_select${index}`).data('using-text-id');
            var select = $(this).find('select');
            var textbook = select.val();
            var checkbox = $(this).find('input[type="checkbox"]');
            var subject = checkbox.val();
            // チェックボックスの状態を確認
            var isChecked = subjectCheckBox.checked;

            if(isChecked) {
                var subjectData = {
                    grade_subject_id: subject,
                    text_book_id: textbook,
                    using_text_id: usingTextId
                };

                subjectsDataBox.push(subjectData)
                if(textbook === ''){
                    emptyTextBookCount++;
                }
            }
        });

        if(className === ''){
            window.alert("クラス名を入力してください")
        } else {
            if(!emptyTextBookCount == 0){
                window.alert("登録する教科の教科書をすべて選択してください")
            } else {
                axios.patch(`/school_classes/${schoolClassId}`, {
                    school_class: {grade_id: gradeClass, class_name: className},
                    subjects: {subjects_data_set: subjectsDataBox}
                })
                .then((res) =>{
                    // if(res.status === 200){
                    //     var schoolClassId = res.data.id
                    //     window.location.href = `/school_classes/${schoolClassId}`
                    // }
                })
            }
        };
    })
})