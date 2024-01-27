import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function copyPasteTemplateLesson (schoolClassId) {
    var copiedGradeSubjectId
    var copiedGradeSubjectName
    $('.copy_lesson_btn').each(function(index, element){
        const dataSet = $(element).data();
        const Id =dataSet.id;
        var gradeSubjectId = dataSet.gradeSubjectId
        var gradeSubjectName = dataSet.gradeSubjectName

        //datasetが追加されたことを検知して再定義
        const copyLessonBtn = document.getElementById(`copy_lesson_btn${Id}`)

        // MutationObserverのコールバック関数
        // 要素の属性変更を検知するObserverを作成
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-grade-subject-id') {
                    gradeSubjectId = Number(copyLessonBtn.getAttribute('data-grade-subject-id'))
                }
            }
        });

        observer.observe(copyLessonBtn, { attributes: true})

        $(`#copy_lesson_btn${Id}`).on('click', () =>{
            copiedGradeSubjectId = gradeSubjectId;
            copiedGradeSubjectName = document.getElementById(`lesson_subject${Id}`).textContent
            $(`#${Id}.lesson_btn_box`).addClass('hidden');
            $(`#${Id}.lesson_ellipsis`).addClass('hidden');
        });

    });

    $('.paste_lesson_btn').each(function(index, element){
        const dataSet = $(element).data()
        const Id =dataSet.id
        var period = dataSet.period
        var dayOfWeek = dataSet.dayOfWeek
        const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)

        const createDataSet = (resData) => {
            // editに対応させるためデータセットをattribute
            var gotLesson = document.getElementById(`got_lesson${Id}`)
            gotLesson.setAttribute('data-subject-name', `${resData.grade_subject_name}`)
            gotLesson.setAttribute('data-grade-subject-id', `${resData.grade_subject_id}`)
            gotLesson.setAttribute('data-template-lesson-id', `${resData.id}`)
            
            // deleteに対応させるためのデータセットをattribute
            var deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)
            deleteLessonBtn.setAttribute('data-template-lesson-id', `${resData.id}`)

            // copyに対応させるためのデータセットをAttribute
            var copyLessonBtn = document.getElementById(`copy_lesson_btn${Id}`)
            copyLessonBtn.setAttribute('data-grade-subject-id', `${resData.grade_subject_id}`)

            // 入れ替えに対応させるためにデータ属性を更新
            $(`#got_lesson${Id}`).data('subjectName', `${resData.grade_subject_name}`)
            $(`#got_lesson${Id}`).data('gradeSubjectId', `${resData.grade_subject_id}`)
            $(`#got_lesson${Id}`).data('templateLessonId', `${resData.id}`);
        };

        var statusDisplay = document.getElementById('status_display')
        $(`#paste_lesson_btn${Id}`).on('click', () =>{
            $(`#${Id}.lesson_btn_box`).addClass('hidden');
            $(`#${Id}.new_lesson_btn`).addClass('hidden');
            $(`#${Id}.lesson_ellipsis`).addClass('hidden');
            // GotLessonがhiddenを持っているか持っていないか判定
            statusDisplay.innerHTML = "保存中…"
            var hasLesson = !$(`#got_lesson${Id}`).hasClass('hidden')
            if(copiedGradeSubjectId){
                if (hasLesson) {
                    var gotLesson = document.getElementById(`got_lesson${Id}`)
                    var templateLessonId = gotLesson.getAttribute('data-template-lesson-id')
                    displayLessonSubject.innerHTML = `${copiedGradeSubjectName}`
                    axios.put(`/school_classes/${schoolClassId}/template_lessons/${templateLessonId}`, {
                        template_lesson: {grade_subject_id: copiedGradeSubjectId}
                    })
                    .then((res) =>{
                        if(res.status === 200){
                            var resData = res.data
                            createDataSet(resData);
                            statusDisplay.innerHTML = "保存済み";
                        };
                    });
                } else {
                    // lessonがない場所にペーストする場合
                    $(`#${Id}.new_lesson_menu`).addClass('hidden')
                    $(`#got_lesson${Id}`).removeClass('hidden')
                    $(`#copy_lesson_btn${Id}`).removeClass('hidden')
                    $(`#delete_lesson_btn${Id}`).removeClass('hidden')
                    displayLessonSubject.innerHTML = `${copiedGradeSubjectName}`
                    axios.post(`/school_classes/${schoolClassId}/template_lessons`, {
                        template_lesson: {day_of_week: dayOfWeek, period: period, grade_subject_id: copiedGradeSubjectId}
                    })
                    .then((res) =>{
                        if(res.status === 200){
                            var resData = res.data
                            createDataSet(resData);
                            statusDisplay.innerHTML = "保存済み";
                        };
                    });
                }
            } else {
                window.alert('何もコピーされていません')
            }
        });
    });
}