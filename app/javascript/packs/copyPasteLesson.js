import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function copyPasteLesson (schoolClassId) {
    var copiedGradeSubjectId
    var copiedGradeSubjectUnitId
    $('.copy_lesson_btn').each(function(index, element){
        const dataSet = $(element).data();
        const Id =dataSet.id;
        var gradeSubjectId = dataSet.gradeSubjectId
        var gotUnitId = dataSet.gotUnitId

        //datasetが追加されたことを検知して再定義
        const copyLessonBtn = document.getElementById(`copy_lesson_btn${Id}`)

        // MutationObserverのコールバック関数
        // 要素の属性変更を検知するObserverを作成
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-got-unit-id') {
                    gradeSubjectId = Number(copyLessonBtn.getAttribute('data-grade-subject-id'))
                    gotUnitId = Number(copyLessonBtn.getAttribute('data-got-unit-id'))
                }
            }
        });

        observer.observe(copyLessonBtn, { attributes: true})

        $(`#copy_lesson_btn${Id}`).on('click', () =>{
            copiedGradeSubjectId = gradeSubjectId
            copiedGradeSubjectUnitId = gotUnitId
        });

    });

    $('.paste_lesson_btn').each(function(index, element){
        const dataSet = $(element).data()
        const Id =dataSet.id
        var date =dataSet.date
        var period = dataSet.period
        var dayOfWeek = dataSet.dayOfWeek
        const displayLessonSubject = document.getElementById(`lesson_subject${Id}`)
        const displayLessonUnit = document.getElementById(`lesson_unit${Id}`)

        const createDataSet = (resData) => {
            // editに対応させるためデータセットをattribute
            var gotLesson = document.getElementById(`got_lesson${Id}`)
            gotLesson.setAttribute('data-subject-name', `${resData.grade_subject_name}`)
            gotLesson.setAttribute('data-grade-subject-id', `${resData.grade_subject_id}`)
            gotLesson.setAttribute('data-got-unit-id', `${resData.grade_subject_unit_id}`)
            gotLesson.setAttribute('data-lesson-id', `${resData.id}`)
            
            // deleteに対応させるためのデータセットをattribute
            var deleteLessonBtn = document.getElementById(`delete_lesson_btn${Id}`)
            deleteLessonBtn.setAttribute('data-lesson-id', `${resData.id}`)

            // copyに対応させるためのデータセットをAttribute
            var copyLessonBtn = document.getElementById(`copy_lesson_btn${Id}`)
            copyLessonBtn.setAttribute('data-grade-subject-id', `${resData.grade_subject_id}`)
            copyLessonBtn.setAttribute('data-got-unit-id', `${resData.grade_subject_unit_id}`)
        };

        const editLessonDisplay = (resData) => {
            displayLessonSubject.innerHTML = `${resData.grade_subject_name}`
            if(resData.unit_name !== null){
                displayLessonUnit.innerHTML = `${resData.unit_name}`
            } else {
                displayLessonUnit.innerHTML = "&nbsp;"
            }
        };

        $(`#paste_lesson_btn${Id}`).on('click', () =>{
            // GotLessonがhiddenを持っているか持っていないか判定
            var hasLesson = !$(`#got_lesson${Id}`).hasClass('hidden')
            if(copiedGradeSubjectId){
                if (hasLesson) {
                    var gotLesson = document.getElementById(`got_lesson${Id}`)
                    var lessonId = gotLesson.getAttribute('data-lesson-id')
                    axios.put(`/school_classes/${schoolClassId}/lessons/${lessonId}`, {
                        lesson: {grade_subject_unit_id: copiedGradeSubjectUnitId, grade_subject_id: copiedGradeSubjectId}
                    })
                    .then((res) =>{
                        if(res.status === 200){
                            var resData = res.data
                            editLessonDisplay(resData)
                            // displayLessonSubject.innerHTML = `${resData.grade_subject_name}`
                            // if(resData.unit_name !== null){
                            //     displayLessonUnit.innerHTML = `${resData.unit_name}`
                            // } else {
                            //     displayLessonUnit.innerHTML = "&nbsp;"
                            // }
                            createDataSet(resData);
                        };
                    });
                } else {
                    // lessonがない場所にペーストする場合
                    axios.post(`/school_classes/${schoolClassId}/lessons`, {
                        lesson: {date: date, day_of_week: dayOfWeek, period: period, grade_subject_unit_id: copiedGradeSubjectUnitId, grade_subject_id: copiedGradeSubjectId}
                    })
                    .then((res) =>{
                        if(res.status === 200){
                            var resData = res.data
                            $(`#${Id}.new_lesson_menu`).addClass('hidden')
                            $(`#got_lesson${Id}`).removeClass('hidden')
                            $(`#copy_lesson_btn${Id}`).removeClass('hidden')
                            $(`#delete_lesson_btn${Id}`).removeClass('hidden')
                            editLessonDisplay(resData);
                            // displayLessonSubject.innerHTML = `${resData.grade_subject_name}`
                            // if(resData.unit_name !== null){
                            //     displayLessonUnit.innerHTML = `${resData.unit_name}`
                            // } else {
                            //     displayLessonUnit.innerHTML = "&nbsp;"
                            // }
                            createDataSet(resData);
                        };
                    });
                }
            } else {
                window.alert('何もコピーされていません')
            }
        });
    });
};