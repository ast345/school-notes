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

              var targetGotLesson = targetBox.find('.got_lesson');
              var sourceGotLesson = sourceBox.find('.got_lesson');
              var targetGotLessonDom = targetGotLesson[0];
              var sourceGotLessonDom = sourceGotLesson[0];
              
              // sourceBoxとtargetBoxの中身が新規作成なのか、既存のlessonがあるのかを判別
              var targetHasLesson = !targetGotLesson.hasClass('hidden');
              var sourceHasLesson = !sourceGotLesson.hasClass('hidden');

              // updateリクエストのためのデータセット
              var targetDataSet = targetGotLesson.data();
              var targetLessonId = targetDataSet.lessonId
              var targetLessonDate = targetDataSet.date
              var targetLessonDayOfWeek = targetDataSet.dayOfWeek
              var targetLessonPeriod = targetDataSet.period

              var sourceDataSet = sourceGotLesson.data();
              var sourceLessonId = sourceDataSet.lessonId
              var sourceLessonDate = sourceDataSet.date
              var sourceLessonDayOfWeek = sourceDataSet.dayOfWeek
              var sourceLessonPeriod = sourceDataSet.period

              // 教科名、単元名を取得
              var sourceLessonSubjectText = sourceBox.find('.lesson_subject').text();
              var targetLessonSubjectText = targetBox.find('.lesson_subject').text();
              var sourceLessonUnitText = sourceBox.find('.lesson_unit').text();
              var targetLessonUnitText = targetBox.find('.lesson_unit').text();


              if (targetHasLesson && sourceHasLesson) {

                // targetLessonのEdit
                axios.put(`/school_classes/${schoolClassId}/lessons/${targetLessonId}`, {
                    lesson: {date: sourceLessonDate, day_of_week: sourceLessonDayOfWeek, period: sourceLessonPeriod}
                })

                // sourceLessonのEdit
                axios.put(`/school_classes/${schoolClassId}/lessons/${sourceLessonId}`, {
                    lesson: {date: targetLessonDate, day_of_week: targetLessonDayOfWeek, period: targetLessonPeriod}
                })

                // lesson_subjectのテキスト内容を交換
                sourceBox.find('.lesson_subject').text(targetLessonSubjectText);
                targetBox.find('.lesson_subject').text(sourceLessonSubjectText);
                sourceBox.find('.lesson_unit').text(targetLessonUnitText);
                targetBox.find('.lesson_unit').text(sourceLessonUnitText);

                //datasetの入れ替え
                sourceGotLessonDom.setAttribute('data-subject-name', targetDataSet.subjectName);
                sourceGotLessonDom.setAttribute('data-grade-subject-id', targetDataSet.gradeSubjectId);
                sourceGotLessonDom.setAttribute('data-got-unit-id', targetDataSet.gotUnitId);
                sourceGotLessonDom.setAttribute('data-lesson-id', targetDataSet.lessonId);

                targetGotLessonDom.setAttribute('data-subject-name', sourceDataSet.subjectName);
                targetGotLessonDom.setAttribute('data-grade-subject-id', sourceDataSet.gradeSubjectId);
                targetGotLessonDom.setAttribute('data-got-unit-id', sourceDataSet.gotUnitId);
                targetGotLessonDom.setAttribute('data-lesson-id', sourceDataSet.lessonId);
              }
              else if (targetHasLesson && !sourceHasLesson) {
                // ドロップ先だけLessonを持っています
                axios.put(`/school_classes/${schoolClassId}/lessons/${targetLessonId}`, {
                    lesson: {date: sourceLessonDate, day_of_week: sourceLessonDayOfWeek, period: sourceLessonPeriod}
                })

                // drop先を新規作成ボタンに変更
                targetBox.find('.got_lesson').addClass('hidden');
                targetBox.find('.new_lesson_btn').removeClass('hidden');

                // drag要素でlessonを表示
                sourceBox.find('.got_lesson').removeClass('hidden');
                sourceBox.find('.new_lesson_btn').addClass('hidden');

                sourceBox.find('.lesson_subject').text(targetLessonSubjectText);
                sourceBox.find('.lesson_unit').text(targetLessonUnitText);

                sourceGotLessonDom.setAttribute('data-subject-name', targetDataSet.subjectName);
                sourceGotLessonDom.setAttribute('data-grade-subject-id', targetDataSet.gradeSubjectId);
                sourceGotLessonDom.setAttribute('data-got-unit-id', targetDataSet.gotUnitId);
                sourceGotLessonDom.setAttribute('data-lesson-id', targetDataSet.lessonId);
                // var sourceContent = sourceBox.html();
                // var targetContent = targetBox.html();
                
                // sourceBox.html(targetContent);
                // targetBox.html(sourceContent);
              }
              else if (!targetHasLesson && sourceHasLesson) {
                // ドラッグ元だけLesssonを持っています
                axios.put(`/school_classes/${schoolClassId}/lessons/${sourceLessonId}`, {
                    lesson: {date: targetLessonDate, day_of_week: targetLessonDayOfWeek, period: targetLessonPeriod}
                })

                // ドラッグ元を新規作成ボタンに変更
                sourceBox.find('.got_lesson').addClass('hidden');
                sourceBox.find('.new_lesson_btn').removeClass('hidden');

                // drop先でlessonを表示
                targetBox.find('.got_lesson').removeClass('hidden');
                targetBox.find('.new_lesson_btn').addClass('hidden');

                targetBox.find('.lesson_subject').text(sourceLessonSubjectText);
                targetBox.find('.lesson_unit').text(sourceLessonUnitText);

                targetGotLessonDom.setAttribute('data-subject-name', sourceDataSet.subjectName);
                targetGotLessonDom.setAttribute('data-grade-subject-id', sourceDataSet.gradeSubjectId);
                targetGotLessonDom.setAttribute('data-got-unit-id', sourceDataSet.gotUnitId);
                targetGotLessonDom.setAttribute('data-lesson-id', sourceDataSet.lessonId);

              }
            }
          });
    });

    // 新規作成に対する処理
    $('.new_lesson_btn').each(function(index, element){
        const dataset = $(element).data()
        const Id = dataset.id
        const period = dataset.period
        const date = dataset.date
        const dayOfWeek = dataset.dayOfWeek
        const selectSubject = document.getElementById(`select_subject${Id}`)
        const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
        const displayLessonUnit = document.getElementById(`lesson_unit${Id}`)
        
        
        $(`#${Id}`+'.new_lesson_btn').on('click', () => {
            $(`#${Id}`+'.edit_lesson_box').removeClass('hidden')
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
                        gradeSubjectUnits.innerHTML = `<select id="unit${Id}"><option value="">&nbsp;</option>${options}</select><p class="new_unit_btn" id= "${Id}">新規</p>`
                        $(`#grade_subject_units${Id}`).removeClass('hidden')
                    
                        $(`#${Id}`+'.new_unit_btn').on('click', () =>{
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
                    
                    if($(`#${Id}`+'.new_unit_box').hasClass('hidden')){
                        if(selectSubject.value === ""){
                            $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                            $(`#${Id}`+'.new_lesson_btn').removeClass('hidden')
                        } else {
                            const selectedOption = selectUnit.querySelector("option:checked"); // 選択されているオプションを取得
                            const selectedUnitName = selectedOption.textContent;
                            const selectedUnitId = Number(selectUnit.value)
                            axios.post(`/school_classes/${schoolClassId}/lessons`, {
                                lesson: {date: date, day_of_week: dayOfWeek, period: period, grade_subject_unit_id: selectedUnitId, grade_subject_id: selectedGradeSubjectId}
                            })
                            .then((res) => {
                                $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                                $(`#grade_subject_units${Id}`).addClass('hidden')
                                $(`#got_lesson${Id}`).removeClass('hidden')
                                displayLessonSubject.innerHTML = `${selectSubject.value}`
                                displayLessonUnit.innerHTML = `${selectedUnitName}`

                                // editに対応させるためデータセットをattribute
                                var gotLesson = document.getElementById(`got_lesson${Id}`)
                                debugger
                                gotLesson.setAttribute('data-subject-name', `${selectSubject.value}`)
                                gotLesson.setAttribute('data-grade-subject-id', `${res.data.grade_subject_id}`)
                                gotLesson.setAttribute('data-got-unit-id', `${res.data.grade_subject_unit_id}`)
                                gotLesson.setAttribute('data-lesson-id', `${res.data.id}`)
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
                                    $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                                    $(`#${Id}`+'.new_unit_box').addClass('hidden')
                                    $(`#got_lesson${Id}`).removeClass('hidden')
                                    displayLessonSubject.innerHTML = `${selectSubject.value}`
                                    displayLessonUnit.innerHTML = `${newUnitName}`


                                    // editに対応させるためデータセットをattribute
                                    var gotLesson = document.getElementById(`got_lesson${Id}`)
                                    gotLesson.setAttribute('data-subject-name', `${selectSubject.value}`)
                                    gotLesson.setAttribute('data-grade-subject-id', `${res.data.grade_subject_id}`)
                                    gotLesson.setAttribute('data-got-unit-id', `${res.data.grade_subject_unit_id}`)
                                    gotLesson.setAttribute('data-lesson-id', `${res.data.id}`)
                                })
                            })

                            document.removeEventListener('click', createEndHandler);
                        }
                    };
                };
            }


            document.addEventListener('click', createEndHandler);
        });

    });

    // 既存のlessonに対する処理
    $('.got_lesson').each(function(index, element){
        const dataset = $(element).data()
        const Id = dataset.id
        var SubjectName = dataset.subjectName
        var GradeSubjectId = dataset.gradeSubjectId
        var GotUnitId = dataset.gotUnitId
        var LessonId = dataset.lessonId

        const gradeSubjectUnits = document.getElementById(`grade_subject_units${Id}`)
        const selectSubject = document.getElementById(`select_subject${Id}`)

        //datasetが追加されたことを検知して再定義
        const gotLesson = document.getElementById(`got_lesson${Id}`)

        // MutationObserverのコールバック関数
        // 要素の属性変更を検知するObserverを作成
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-lesson-id') {
                    SubjectName = gotLesson.getAttribute('data-subject-name')
                    GradeSubjectId= Number(gotLesson.getAttribute('data-grade-subject-id'))
                    GotUnitId = Number(gotLesson.getAttribute('data-got-unit-id'))
                    LessonId = Number(gotLesson.getAttribute('data-lesson-id'))
                }
            }
        });

        observer.observe(gotLesson, { attributes: true})
        
        $(`#lesson_subject${Id}, #lesson_unit${Id}`).on('click', () =>{
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
                $(`#grade_subject_units${Id}`).removeClass('hidden')
                gradeSubjectUnits.innerHTML = `<select id="unit${Id}"><option value="">&nbsp;</option>${options}</select><p class="new_unit_btn" id="${Id}">新規</p>`
                $(`#unit${Id} option`).each(function() {
                    const optionValue = Number($(this).val());
                    // value と SubjectName を比較して一致する場合、選択状態にする
                    if (optionValue === GotUnitId) {
                        $(this).prop('selected', true);
                    }
                });

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
                            gradeSubjectUnits.innerHTML = `<select id="unit${Id}"><option value="">&nbsp;</option>${options}</select><p class="new_unit_btn" id="${Id}">新規</p>`
    
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                    };
                });

                $(`#${Id}`+'.new_unit_btn').on('click', () =>{
                    $(`#${Id}`+'.new_unit_box').removeClass('hidden')
                    $('.unit_select_box').addClass('hidden')
                });

                $(`#${Id}`+'.cancel_btn').on('click', () => {
                    $(`#${Id}`+'.new_unit_box').addClass('hidden')
                    $('.unit_select_box').removeClass('hidden')
                });

                document.addEventListener('click', editEndHandler);
            });



        });

        function editEndHandler(event) {
            const clickedElement = event.target;
            const creatingElement = $('.lesson_box'+`#${Id}`);

            const selectSubject = document.getElementById(`select_subject${Id}`)
            const selectedSubjectIndex = selectSubject.selectedIndex;
            const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
            const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
            const displayLessonUnit = document.getElementById(`lesson_unit${Id}`)
            
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
                        displayLessonSubject.innerHTML = `${selectSubject.value}`
                        displayLessonUnit.innerHTML = `${selectedUnitName}`
                        
                        // 再変更のために定義変更
                        SubjectName = `${selectSubject.value}`
                        GotUnitId = res.data.grade_subject_unit_id
                        GradeSubjectId = res.data.grade_subject_id

                    });
                    document.removeEventListener('click', editEndHandler)
                } else {
                    // 単元名が新規作成されている時の処理
                    const newUnitName = $(`#new_unit_name${Id}`).val()
                    if (!newUnitName) {
                        window.alert('新しい単元名を入力してください')
                    } else {
                        axios.post(`/grade_subject_units`, {
                            grade_subject_unit: {unit_name: newUnitName, grade_subject_id: selectedGradeSubjectId}
                        })
                        .then((res) => {
                            const createdUnitId = res.data.id
                            axios.put(`/school_classes/${schoolClassId}/lessons/${LessonId}`, {
                                lesson: {grade_subject_unit_id: createdUnitId, grade_subject_id: selectedGradeSubjectId}
                            })
                            .then((res) => {
                                $(`#${Id}.edit_lesson_box`).addClass('hidden')
                                $(`#${Id}`+'.new_unit_box').addClass('hidden')
                                $(`#got_lesson${Id}`).removeClass('hidden')

                                displayLessonSubject.innerHTML = `${selectSubject.value}`
                                displayLessonUnit.innerHTML = `${newUnitName}`

                                SubjectName = `${selectSubject.value}`
                                GotUnitId = res.data.grade_subject_unit_id
                                GradeSubjectId = res.data.grade_subject_id
                            })
                        })

                        document.removeEventListener('click', editEndHandler);
                    }
                };
            };
        }

        
    });


});