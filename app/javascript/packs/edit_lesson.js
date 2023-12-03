import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function editLesson(schoolClassId) {
    function adjustSubjectFZ(element) {
        const $element = $(element);
        $element.css({'font-size': "16px", "line-height": "30px"});
        const rowHeight = $('.row_lesson').height()/5*2 ;  // 要素の高さを取得
        const originalHTML = $element.html(); // 元のHTMLを保持
        let fontSize = parseInt($element.css('font-size'));
        let lineHeight = parseInt($element.css('line-height'));

        while (($element[0].scrollHeight > rowHeight || $element[0].getClientRects().length > 1) && fontSize > 1) {
            fontSize -= 1; // フォントサイズを1ずつ減らす（必要に応じて調整可能）
            $element.css({
                'font-size': fontSize + 'px',
                'line-height': lineHeight + 'px',
            });
        }
        $element.html(originalHTML);
      }

    function adjustUnitFZ(element) {
        const $element = $(element);
        $element.css({'font-size': "16px", "line-height": "24px"});
        const rowHeight = $('.row_lesson').height()/5*3 ; // 要素の高さを取得
        const originalHTML = $element.html(); // 元のHTMLを保持
        let fontSize = parseInt($element.css('font-size')); // デフォルトのフォントサイズを取得
        let lineHeight = parseInt($element.css('line-height')); // 行の高さを取得
        $element.css('white-space', 'normal'); // テキストを通常の折り返しに設定

        while ($element[0].scrollHeight > rowHeight  && fontSize > 1) {
            fontSize -= 1; // フォントサイズを1ずつ減らす（必要に応じて調整可能）
            lineHeight = Math.floor(fontSize * 1.2); // 行の高さも変更（フォントサイズに基づいて調整）
            $element.css({
                'font-size': fontSize + 'px',
                'line-height': lineHeight + 'px',
            });
        }
        $element.html(originalHTML);
    }

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

        var statusDisplay = document.getElementById('status_display')
        $(`#lesson_subject${Id}, #lesson_unit${Id}`).on('click', () =>{
            $(`#got_lesson${Id}`).addClass('hidden')
            $(`#${Id}.lesson_btn_js_box`).addClass('hidden')
            $(`#${Id}.edit_lesson_box`).removeClass('hidden')
            $(`#${Id}.lesson_ellipsis_box`).addClass('hidden')
            statusDisplay.innerHTML = "保存中…"
            $(`#select_subject${Id} option`).each(function() {
                const optionValue = $(this).val();
                // value と SubjectName を比較して一致する場合、選択状態にする
                if (optionValue === SubjectName) {
                    $(this).prop('selected', true);
                }
            });

            axios.get(`/get_grade_subject_units`, {
                params: {grade_subject_id: GradeSubjectId, school_class_id: schoolClassId}
            })
            .then((res) => {
                const unitSet = res.data
                const options = unitSet.map(unit => `<option value="${unit.id}">${unit.unit_name}</option>`).join('')
                $(`#grade_subject_units${Id}`).removeClass('hidden')
                gradeSubjectUnits.innerHTML = `<select id="unit${Id}", class="select_unit"><option value="">&nbsp;</option>${options}</select><i class="fa-regular fa-pen-to-square unit_create_btn", id="${Id}">新しい単元名</i>`
                $(`#unit${Id} option`).each(function() {
                    const optionValue = Number($(this).val());
                    // optionValue と SubjectName を比較して一致する場合、選択状態にする
                    if (optionValue === GotUnitId) {
                        $(this).prop('selected', true);
                    }
                });

                selectSubject.addEventListener('change', function() {
                    const selectedSubject = selectSubject.value;
                    const gradeSubjectUnits = document.getElementById(`grade_subject_units${Id}`);
                    const selectedSubjectIndex = selectSubject.selectedIndex;
                    const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
                    // 選択された科目に基づく単元名の表示
                    if (selectedSubject) {
                        axios.get(`/get_grade_subject_units`, {
                            params: {grade_subject_id: selectedGradeSubjectId, school_class_id: schoolClassId}
                        })
                        .then((res) => {
                            const unitSet = res.data
                            const options = unitSet.map(unit => `<option value="${unit.id}">${unit.unit_name}</option>`).join('')
                            gradeSubjectUnits.innerHTML = `<select id="unit${Id}", class="select_unit"><option value="">&nbsp;</option>${options}</select><i class="fa-regular fa-pen-to-square unit_create_btn", id="${Id}">新しい単元名</i>`

                            $(`#${Id}.unit_create_btn`).on('click', () =>{
                                $(`#${Id}`+'.new_unit_box').removeClass('hidden')
                                $(`#grade_subject_units${Id}`).addClass('hidden')
                            });
            
                            $(`#${Id}`+'.cancel_btn').on('click', () => {
                                $(`#${Id}`+'.new_unit_box').addClass('hidden')
                                $(`#grade_subject_units${Id}`).removeClass('hidden')
                            });
                        })
                        .catch(error => {
                            window.alert("単元名を正しく取得できませんでした。")
                        });
                    };

                });

                $(`#${Id}.unit_create_btn`).on('click', () =>{
                    $(`#${Id}`+'.new_unit_box').removeClass('hidden')
                    $(`#grade_subject_units${Id}`).addClass('hidden')
                });

                $(`#${Id}`+'.cancel_btn').on('click', () => {
                    $(`#${Id}`+'.new_unit_box').addClass('hidden')
                    $(`#grade_subject_units${Id}`).removeClass('hidden')
                });


                document.addEventListener('click', editEndHandler);
            });



        });

        function editEndHandler(event) {
            const clickedElement = event.target;
            const creatingElement = $('.lesson_box'+`#${Id}`);

            const selectSubject = document.getElementById(`select_subject${Id}`)
            const selectedSubjectName = selectSubject.value;
            const selectedSubjectIndex = selectSubject.selectedIndex;
            const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
            const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
            const displayLessonUnit = document.getElementById(`lesson_unit${Id}`)

            const editDataSet = (resData) => {
                // deleteに対応させるためのデータセットをattribute
                var deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)
                deleteLessonBtn.setAttribute('data-lesson-id', `${resData.id}`)

                // copyに対応させるためのデータセットをAttribute
                // obseverまだ
                var copyLessonBtn = document.getElementById(`copy_lesson_btn${Id}`)
                copyLessonBtn.setAttribute('data-grade-subject-id', `${resData.grade_subject_id}`)
                copyLessonBtn.setAttribute('data-got-unit-id', `${resData.grade_subject_unit_id}`)
            };

            if (!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0) {
                const selectUnit = document.getElementById(`unit${Id}`)
                const selectedOption = selectUnit.querySelector("option:checked");

                if(selectedSubjectIndex == 0){
                    var result =window.confirm('このコマの予定を削除してよろしいですか。');
                    if(result === true){
                        $(`#got_lesson${Id}`).addClass('hidden')
                        $(`#${Id}.new_lesson_menu`).removeClass('hidden')
                        $(`#copy_lesson_btn${Id}`).addClass('hidden')
                        $(`#delete_lesson_btn${Id}`).addClass('hidden')
                        $(`#grade_subject_units${Id}`).addClass('hidden')
                        $(`#${Id}.edit_lesson_box`).addClass('hidden')
                        $(`#${Id}.lesson_btn_js_box`).removeClass('hidden')
                        $(`#${Id}.lesson_ellipsis_box`).removeClass('hidden')
        
                        displayLessonSubject.innerHTML = ""
                        displayLessonUnit.innerHTML = ""
                        axios.delete(`/school_classes/${schoolClassId}/lessons/${LessonId}`)
                        .then((res) =>{
                            if(res.status === 204){
                                statusDisplay.innerHTML = "保存済み"
                            };
                        });
                        document.removeEventListener('click', editEndHandler)
                    }
                } else if($(`#${Id}`+'.new_unit_box').hasClass('hidden')){
                    // 単元名が新規作成されていない時の処理
                    $(`#grade_subject_units${Id}`).addClass('hidden')
                    $(`#${Id}.edit_lesson_box`).addClass('hidden')
                    $(`#got_lesson${Id}`).removeClass('hidden')
                    $(`#${Id}.lesson_btn_js_box`).removeClass('hidden')
                    $(`#${Id}.lesson_ellipsis_box`).removeClass('hidden')
                    // 中身を差し替え
                    const selectedUnitName = selectedOption.textContent;
                    displayLessonSubject.innerHTML = `${selectedSubjectName}`
                    displayLessonUnit.innerHTML = `${selectedUnitName}`
                    adjustSubjectFZ(displayLessonSubject);
                    adjustUnitFZ(displayLessonUnit);

                    const selectedUnitId = Number(selectUnit.value)
                    axios.put(`/school_classes/${schoolClassId}/lessons/${LessonId}`, {
                        lesson: {grade_subject_unit_id: selectedUnitId, grade_subject_id: selectedGradeSubjectId}
                    })
                    .then((res) =>{
                        var resData= res.data
                        // 再変更のために定義変更
                        SubjectName = `${selectSubject.value}`
                        GotUnitId = resData.grade_subject_unit_id
                        GradeSubjectId = resData.grade_subject_id

                        editDataSet(resData);
                        statusDisplay.innerHTML = "保存済み"
                    });
                    document.removeEventListener('click', editEndHandler)
                } else {
                    // 単元名が新規作成されている時の処理
                    const newUnitName = $(`#new_unit_name${Id}`).val()
                    if (!newUnitName) {
                        window.alert('新しい単元名を入力してください')
                    } else {
                        $(`#${Id}.edit_lesson_box`).addClass('hidden')
                        $(`#${Id}`+'.new_unit_box').addClass('hidden')
                        $(`#got_lesson${Id}`).removeClass('hidden')
                        $(`#${Id}.lesson_btn_js_box`).removeClass('hidden')
                        $(`#${Id}.lesson_ellipsis_box`).removeClass('hidden')

                        displayLessonSubject.innerHTML = `${selectedSubjectName}`
                        displayLessonUnit.innerHTML = `${newUnitName}`
                        adjustSubjectFZ(displayLessonSubject)
                        adjustUnitFZ(displayLessonUnit);

                        axios.post(`/grade_subject_units`, {
                            grade_subject_unit: {unit_name: newUnitName, grade_subject_id: selectedGradeSubjectId, school_class_id: schoolClassId}
                        })
                        .then((res) => {
                            const createdUnitId = res.data.id
                            axios.put(`/school_classes/${schoolClassId}/lessons/${LessonId}`, {
                                lesson: {grade_subject_unit_id: createdUnitId, grade_subject_id: selectedGradeSubjectId}
                            })
                            .then((res) => {
                                var resData = res.data

                                SubjectName = `${selectSubject.value}`
                                GotUnitId = resData.grade_subject_unit_id
                                GradeSubjectId = resData.grade_subject_id
                                editDataSet(resData);
                                statusDisplay.innerHTML = "保存済み"
                            })
                            document.removeEventListener('click', editEndHandler);
                        })
                        .catch(error => {
                            const res = error.response;
                            if (res.status == 422) {
                                var gradeSubjectUnitId = res.data.duplicated_unit_id
                                axios.put(`/school_classes/${schoolClassId}/lessons/${LessonId}`, {
                                    lesson: {grade_subject_unit_id: gradeSubjectUnitId, grade_subject_id: selectedGradeSubjectId}
                                })
                                .then((res) =>{
                                    var resData= res.data
                                    // 再変更のために定義変更
                                    SubjectName = `${selectSubject.value}`
                                    GotUnitId = resData.grade_subject_unit_id
                                    GradeSubjectId = resData.grade_subject_id
            
                                    editDataSet(resData);
                                    statusDisplay.innerHTML = "保存済み"
                                });
                            } else {
                                window.alert("変更できませんでした")
                                location.reload()
                            };
                            document.removeEventListener('click', editEndHandler);
                        });

                    }
                };
            };
        }
    });

}