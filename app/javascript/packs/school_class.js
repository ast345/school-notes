import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;

    $(function() {
        $('.lesson_box').draggable({
            revert: 'invalid',
            cursor: 'move',
            helper: 'clone'
          });
        
          $('.lesson_box').droppable({
            accept: '.lesson_box',
            drop: function(event, ui) {
              var sourceBox = $(ui.draggable);
              var targetBox = $(this);
              
              // Swap the contents of the source and target boxes
              var sourceContent = sourceBox.html();
              var targetContent = targetBox.html();
              
              sourceBox.html(targetContent);
              targetBox.html(sourceContent);
              
              // $.ajax({
              //   url: '/update_lesson_order', // Change this to the appropriate route
              //   method: 'POST',
              //   data: { sourceIndex: sourceIndex, targetIndex: targetIndex },
              //   success: function(response) {
              //     // Handle success if needed
              //   },
              //   error: function(error) {
              //     // Handle error if needed
              //   }
              // });
            }
          });
    });

    $('.new_lesson_btn').each(function(index, element){
        const dataset = $(element).data()
        const Id = dataset.id
        const period = dataset.period
        const date = dataset.date
        const dayOfWeek = dataset.dayOfWeek
        const selectSubject = document.getElementById(`select_subject${Id}`)
        
        
        $(`#${Id}`+'.new_lesson_btn').on('click', () => {
            $(`#${Id}`+'.new_lesson_box').removeClass('hidden')
            $(`#${Id}`+'.new_lesson_btn').addClass('hidden')

            
            selectSubject.addEventListener('change', function() {
                const selectedSubject = selectSubject.value;
                const gradeSubjectUnits = document.getElementById(`grade_subject_units${Id}`);
                const selectedSubjectIndex = selectSubject.selectedIndex;
                const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
                // ここに選択された科目に基づくアクションを追加
                // 例: 選択された科目に応じてメッセージを表示する
                if (selectedSubject) {
                    axios.get(`/get_grade_subject_units`, {
                        params: {grade_subject_id: selectedGradeSubjectId}
                    })
                    .then((res) => {
                        const unitSet = res.data
                        const options = unitSet.map(unit => `<option value="${unit.id}">${unit.unit_name}</option>`).join('')
                        gradeSubjectUnits.innerHTML = `<select id="unit${Id}"><option value="">&nbsp;</option>${options}</select><p class="new_unit_btn">新規</p>`
                    
                        $('.new_unit_btn').on('click', () =>{
                            $(`#${Id}`+'.new_unit_box').removeClass('hidden')
                            $(`#grade_subject_units${Id}`).addClass('hidden')
                        });

                        $(`#${Id}`+'.cancel_btn').on('click', () => {
                            $(`#${Id}`+'.new_unit_box').addClass('hidden')
                            $(`#grade_subject_units${Id}`).removeClass('hidden')
                        });

                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
                };
            });

            function createEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $('.lesson_box'+`#${Id}`);

                if (!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0) {
                    //$(`#${Id}`+'.new_unit_box')がhiddenクラスを持つかどうかで条件分岐
                    const selectedSubjectIndex = selectSubject.selectedIndex;
                    const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
    
                    const selectUnit = document.getElementById(`unit${Id}`)
                    const selectedOption = selectUnit.querySelector("option:checked"); // 選択されているオプションを取得
                    const createdLessonBox = document.getElementById(`created_lesson_box${Id}`)

                    if($(`#${Id}`+'.new_unit_box').hasClass('hidden')){
                        const selectedUnitName = selectedOption.textContent;
                        const selectedUnitId = Number(selectUnit.value)
                        if(selectSubject.value === ""){
                            $(`#${Id}`+'.new_lesson_box').addClass('hidden')
                            $(`#${Id}`+'.new_lesson_btn').removeClass('hidden')
                        } else {
                            axios.post(`/school_classes/${schoolClassId}/lessons`, {
                                lesson: {date: date, day_of_week: dayOfWeek, period: period, grade_subject_unit_id: selectedUnitId, grade_subject_id: selectedGradeSubjectId}
                            })
                            .then((res) => {
                                $(`#${Id}`+'.new_lesson_box').addClass('hidden')
                                $(`#grade_subject_units${Id}`).addClass('hidden')
                                createdLessonBox.innerHTML = `<p class="lesson_subject">${selectSubject.value}</p><p>${selectedUnitName}</p>`

                            })
                        }
                        document.removeEventListener('click', createEndHandler);
                    } else {
                        const newUnitName = $(`#new_unit_name${Id}`).val()
                        if (!newUnitName) {
                            window.alert('新しい単元名を入力してください')
                        } else {
                            axios.post(`/grade_subject_units`, {
                                grade_subject_unit: {unit_name: newUnitName, grade_subject_id: selectedGradeSubjectId}
                            })
                            .then((res) => {
                                const createdUnitId = res.data.id
                                axios.post(`/school_classes/${schoolClassId}/lessons`, {
                                    lesson: {date: date, day_of_week: dayOfWeek, period: period, grade_subject_unit_id: createdUnitId, grade_subject_id: selectedGradeSubjectId}
                                })
                                .then((res) => {
                                    $(`#${Id}`+'.new_lesson_box').addClass('hidden')
                                    $(`#${Id}`+'.new_unit_box').addClass('hidden')
                                    
                                    createdLessonBox.innerHTML = `<p class="lesson_subject">${selectSubject.value}</p><p>${newUnitName}</p>`
    
                                })
                            })

                            document.removeEventListener('click', createEndHandler);
                        }
                    };
                };
            }


            document.addEventListener('click', createEndHandler);
        });

        $(`#${Id}`+'.lesson_subject').on('click', () =>{
            debugger
            window.alert("検知しました")
        });

    });

    $('.got_lesson').each(function(index, element){
        const dataset = $(element).data()
        const Id = dataset.id
        const SubjectName = dataset.subjectName
        const GradeSubjectId = dataset.gradeSubjectId
        const GotUnitId = dataset.gotUnitId
        const LessonId = dataset.lessonId
        
        const gradeSubjectUnits = document.getElementById(`grade_subject_units${Id}`)
        
        $(`#${Id}.lesson_subject, #${Id}.lesson_unit`).on('click', () =>{
            $(`#got_lesson${Id}`).addClass('hidden')
            $(`#${Id}.edit_lesson_box`).removeClass('hidden')

            $(`#select_subject${Id} option`).each(function() {
                const optionValue = $(this).val();
                
                // value と SubjectName を比較して一致する場合、選択状態にする
                if (optionValue === SubjectName) {
                    $(this).prop('selected', true);
                }
            });

            axios.get(`/get_grade_subject_units`, {
                params: {grade_subject_id: GradeSubjectId}
            })
            .then((res) => {
                const unitSet = res.data
                const options = unitSet.map(unit => `<option value="${unit.id}">${unit.unit_name}</option>`).join('')
                gradeSubjectUnits.innerHTML = `<select id="unit${Id}"><option value="">&nbsp;</option>${options}</select><p class="new_unit_btn">新規</p>`
                $(`#unit${Id} option`).each(function() {
                    const optionValue = Number($(this).val());
                    // value と SubjectName を比較して一致する場合、選択状態にする
                    if (optionValue === GotUnitId) {
                        $(this).prop('selected', true);
                    }
                });

                $('.new_unit_btn').on('click', () =>{
                    $(`#${Id}`+'.new_unit_box').removeClass('hidden')
                    $('.unit_select_box').addClass('hidden')
                });

                $(`#${Id}`+'.cancel_btn').on('click', () => {
                    $(`#${Id}`+'.new_unit_box').addClass('hidden')
                    $('.unit_select_box').removeClass('hidden')
                });
            });

            function editEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $('.lesson_box'+`#${Id}`);

                const selectSubject = document.getElementById(`select_subject${Id}`)
                const selectedSubjectIndex = selectSubject.selectedIndex;
                const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex];

                const gotLessonBox = document.getElementById(`got_lesson${Id}`)
                
                if (!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0) {
                    const selectUnit = document.getElementById(`unit${Id}`)
                    const selectedOption = selectUnit.querySelector("option:checked");
                    if($(`#${Id}`+'.new_unit_box').hasClass('hidden')){
                        // 単元名が新規作成されていない時の処理
                        const selectedUnitName = selectedOption.textContent;
                        const selectedUnitId = Number(selectUnit.value)

                        axios.put(`/school_classes/${schoolClassId}/lessons/${LessonId}`, {
                            lesson: {grade_subject_unit_id: selectedUnitId, grade_subject_id: selectedGradeSubjectId}
                        })
                        .then((res) =>{
                            $(`#grade_subject_units${Id}`).addClass('hidden')
                            $(`#${Id}.edit_lesson_box`).addClass('hidden')
                            $(`#got_lesson${Id}`).removeClass('hidden')
                            // 中身を差し替え
                            gotLessonBox.innerHTML = `<p class="lesson_subject" id=${Id}>${selectSubject.value}</p><p class="lesson_unit" id=${Id}>${selectedUnitName}</p>`
                        });
                        document.removeEventListener('click', editEndHandler)
                    } else {
                        // 単元名が新規作成されている時の処理
                    };
                };
            }

            document.addEventListener('click', editEndHandler);

        });
    });


});