import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function tempLessonCUD(schoolClassId) {
    var statusDisplay = document.getElementById('status_display');
        //create処理
        $('.new_lesson_btn').each(function(index, element){
            const dataset = $(element).data()
            const Id = element.id
            const period = dataset.period
            const dayOfWeek = dataset.dayOfWeek
    
            const selectSubject = document.getElementById(`select_subject${Id}`)
            const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
    
            $(`#${Id}`+'.new_lesson_btn').on('click', () => {
                statusDisplay.innerHTML = "保存中…"
                $(`#${Id}`+'.edit_lesson_box').removeClass('hidden')
                $(`#${Id}`+'.lesson_btn_box').addClass('hidden')
                $(`#${Id}`+'.new_lesson_menu').addClass('hidden')
                $(`#${Id}.lesson_ellipsis_box`).addClass('hidden')
    
                function createEndHandler(event) {
                    var clickedElement = event.target;
                    var creatingElement = $('.lesson_box'+`#${Id}`);
    
                    if (!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0) {
                        const selectedSubjectIndex = selectSubject.selectedIndex;
                        const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
    
                        const createDataSet = (res) => {
                                        // editに対応させるためデータセットをattribute
                                        var gotLesson = document.getElementById(`got_lesson${Id}`)
                                        gotLesson.setAttribute('data-subject-name', `${selectSubject.value}`)
                                        gotLesson.setAttribute('data-grade-subject-id', `${res.data.grade_subject_id}`)
                                        gotLesson.setAttribute('data-template-lesson-id', `${res.data.id}`)
    
                                        // deleteに対応させるためのデータセットをattribute
                                        var deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)
                                        deleteLessonBtn.setAttribute('data-template-lesson-id', `${res.data.id}`)
    
                                        // copyに対応させるためのデータセットをAttribute
                                        var copyLessonBtn = document.getElementById(`copy_lesson_btn${Id}`)
                                        copyLessonBtn.setAttribute('data-grade-subject-id', `${res.data.grade_subject_id}`)
    
                                        // 入れ替えに対応させるためにデータ属性を更新
                                        $(`#got_lesson${Id}`).data('subjectName', `${selectSubject.value}`)
                                        $(`#got_lesson${Id}`).data('gradeSubjectId', `${res.data.grade_subject_id}`)
                                        $(`#got_lesson${Id}`).data('templateLessonId', `${res.data.id}`);
                        };

                        if(selectSubject.value === ""){
                            $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                            $(`#${Id}`+'.new_lesson_menu').removeClass('hidden')
                            $(`#${Id}.lesson_ellipsis_box`).removeClass('hidden')
                            statusDisplay.innerHTML = "保存済み"
                        } else {
                            $(`#${Id}`+'.edit_lesson_box').addClass('hidden')
                            $(`#got_lesson${Id}`).removeClass('hidden')
                            $(`#${Id}.lesson_ellipsis_box`).removeClass('hidden')
                            $(`#copy_lesson_btn${Id}`).removeClass('hidden')
                            $(`#delete_lesson_btn${Id}`).removeClass('hidden')
                            displayLessonSubject.innerHTML = `${selectSubject.value}`

                            axios.post(`/school_classes/${schoolClassId}/template_lessons`, {
                                template_lesson: {day_of_week: dayOfWeek, period: period, grade_subject_id: selectedGradeSubjectId}
                            })
                            .then((res) => {
                                if(res.status === 200){
                                    createDataSet(res);
                                    statusDisplay.innerHTML = "保存済み"
                                };
                            })
                        }
                        document.removeEventListener('click', createEndHandler);
                    };
                }
    
                document.addEventListener('click', createEndHandler);
            });
    
        });
    
        //edit処理
        $('.got_lesson').each(function(index, element){
            const dataset = $(element).data()
            const Id = dataset.id
    
            var subjectName = dataset.subjectName
            var gradeSubjectId = dataset.gradeSubjectId
            var templateLessonId = dataset.templateLessonId
    
            // const selectSubject = document.getElementById(`select_subject${Id}`)
    
            //datasetが追加されたことを検知して再定義
            const gotLesson = document.getElementById(`got_lesson${Id}`)
            var observer = new MutationObserver(function(mutationsList) {
                for (var mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-template-lesson-id') {
                        subjectName = gotLesson.getAttribute('data-subject-name')
                        gradeSubjectId= Number(gotLesson.getAttribute('data-grade-subject-id'))
                        templateLessonId = Number(gotLesson.getAttribute('data-template-lesson-id'))
                    }
                }
            });
            observer.observe(gotLesson, { attributes: true})
            
            $(`#lesson_subject${Id}`).on('click', () =>{
                statusDisplay.innerHTML = "保存中…"
                $(`#got_lesson${Id}`).addClass('hidden')
                $(`#${Id}.lesson_btn_js_box`).addClass('hidden')
                $(`#${Id}.edit_lesson_box`).removeClass('hidden')
                $(`#${Id}.lesson_ellipsis_box`).addClass('hidden')
                $(`#select_subject${Id} option`).each(function() {
                    const optionValue = $(this).val();
                    
                    // value と SubjectName を比較して一致する場合、選択状態にする
                    if (optionValue === subjectName) {
                        $(this).prop('selected', true);
                    }
                });
    
                document.addEventListener('click', editEndHandler);
            });
    
            function editEndHandler(event) {
                const clickedElement = event.target;
                const creatingElement = $('.lesson_box'+`#${Id}`);
    
                const selectSubject = document.getElementById(`select_subject${Id}`)
                const selectedSubjectIndex = selectSubject.selectedIndex;
                const selectedGradeSubjectId = gon.grade_subject_ids[selectedSubjectIndex-1];
                const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
    
                const editDataSet = (resData) => {
                    // deleteに対応させるためのデータセットをattribute
                    var deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)
                    deleteLessonBtn.setAttribute('data-template-lesson-id', `${resData.id}`)
    
                    // copyに対応させるためのデータセットをAttribute
                    var copyLessonBtn = document.getElementById(`copy_lesson_btn${Id}`)
                    copyLessonBtn.setAttribute('data-grade-subject-id', `${resData.grade_subject_id}`)
                };
    
                if (!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0) {
                    if (selectedSubjectIndex == 0) {
                        var result =window.confirm('このコマの予定を削除してよろしいですか。');
                        if(result === true){
                            $(`#got_lesson${Id}`).addClass('hidden')
                            $(`#${Id}.new_lesson_menu`).removeClass('hidden')
                            $(`#copy_lesson_btn${Id}`).addClass('hidden')
                            $(`#delete_lesson_btn${Id}`).addClass('hidden')
                            $(`#${Id}.edit_lesson_box`).addClass('hidden')
                            $(`#${Id}.lesson_btn_js_box`).removeClass('hidden')
                            $(`#${Id}.lesson_ellipsis_box`).removeClass('hidden')
                            axios.delete(`/school_classes/${schoolClassId}/template_lessons/${templateLessonId}`)
                            .then((res) =>{
                                if(res.status === 204){
                                    statusDisplay.innerHTML = "保存済み"
                                };
                            });
                        }
                        document.removeEventListener('click', editEndHandler)
                    } else {
                        $(`#${Id}.edit_lesson_box`).addClass('hidden')
                        $(`#got_lesson${Id}`).removeClass('hidden')
                        $(`#${Id}.lesson_btn_js_box`).removeClass('hidden')
                        $(`#${Id}.lesson_ellipsis_box`).removeClass('hidden')
                        // 中身を差し替え
                        displayLessonSubject.innerHTML = `${selectSubject.value}`
    
                        axios.put(`/school_classes/${schoolClassId}/template_lessons/${templateLessonId}`, {
                            template_lesson: {grade_subject_id: selectedGradeSubjectId}
                        })
                        .then((res) =>{
                            var resData= res.data
    
                            // 再変更のために定義変更
                            subjectName = `${selectSubject.value}`
                            gradeSubjectId = resData.grade_subject_id
    
                            editDataSet(resData);
                            statusDisplay.innerHTML = "保存済み"
                        });
                        document.removeEventListener('click', editEndHandler)
                    }
                };
            }
        });
    
        //lessonのdestroy機能
        $('.delete_lesson_btn').each(function(index, element){
            const dataSet = $(element).data()
            const Id =dataSet.id
            var templateLessonId = dataSet.templateLessonId
    
            //datasetが追加されたことを検知して再定義
            const deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)
    
            // MutationObserverのコールバック関数
            // 要素の属性変更を検知するObserverを作成
            var observer = new MutationObserver(function(mutationsList) {
                for (var mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-template-lesson-id') {
                        templateLessonId = Number(deleteLessonBtn.getAttribute('data-template-lesson-id'))
                    }
                }
            });
    
            observer.observe(deleteLessonBtn, { attributes: true})
            
            $(`#delete_lesson_btn${Id}`).on('click', () =>{
                var result =window.confirm('本当に削除しますか');
                if(result === true){
                    $(`#got_lesson${Id}`).addClass('hidden')
                    $(`#${Id}.new_lesson_menu`).removeClass('hidden')
                    $(`#copy_lesson_btn${Id}`).addClass('hidden')
                    $(`#delete_lesson_btn${Id}`).addClass('hidden')
                    statusDisplay.innerHTML = "保存中…"
                    axios.delete(`/school_classes/${schoolClassId}/template_lessons/${templateLessonId}`)
                    .then((res) =>{
                        if(res.status === 204){
                            statusDisplay.innerHTML = "保存済み"
                        };
                    });
                }
            })
    
        });
}