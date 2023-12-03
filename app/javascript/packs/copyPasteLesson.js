import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function copyPasteLesson (schoolClassId) {
    var copiedGradeSubjectId
    var copiedGradeSubjectUnitId
    var copiedGradeSubjectName
    var copiedUnitName
    $('.copy_lesson_btn').each(function(index, element){
        const dataSet = $(element).data();
        const Id =dataSet.id;
        var gradeSubjectId = dataSet.gradeSubjectId
        var gotUnitId = dataSet.gotUnitId
        var gradeSubjectName = dataSet.gradeSubjectName
        var unitName = dataSet.unitName

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
            copiedGradeSubjectName = gradeSubjectName
            copiedUnitName =unitName
            $(this).removeClass('fa-copy').addClass('fa-check');

        // 数秒後に元のアイコンに戻す
        var btn = $(this);
        setTimeout(function() {
            btn.removeClass('fa-check').addClass('fa-copy');
        }, 5000);
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

            // 入れ替えに対応させるためにデータ属性を更新
            $(`#got_lesson${Id}`).data('subjectName', `${resData.grade_subject_name}`)
            $(`#got_lesson${Id}`).data('gradeSubjectId', `${resData.grade_subject_id}`)
            $(`#got_lesson${Id}`).data('gotUnitId', `${resData.grade_subject_unit_id}`)
            $(`#got_lesson${Id}`).data('lessonId', `${resData.id}`);
        };

        const editLessonDisplay = (resData) => {
            displayLessonSubject.innerHTML = `${resData.grade_subject_name}`
            if(resData.unit_name !== undefined){
                displayLessonUnit.innerHTML = `${resData.unit_name}`
            } else {
                displayLessonUnit.innerHTML = "&nbsp;"
            }
        };

        var statusDisplay = document.getElementById('status_display')
        $(`#paste_lesson_btn${Id}`).on('click', () =>{
            $(`#${Id}.lesson_btn_box`).addClass('hidden');
            $(`#${Id}.new_lesson_btn`).addClass('hidden');
            $(`#${Id}.lesson_ellipsis`).addClass('hidden');
            // GotLessonがhiddenを持っているか持っていないか判定
            var hasLesson = !$(`#got_lesson${Id}`).hasClass('hidden')
            if(copiedGradeSubjectId){
                if (hasLesson) {
                    statusDisplay.innerHTML = "保存中…"
                    var gotLesson = document.getElementById(`got_lesson${Id}`)
                    var lessonId = gotLesson.getAttribute('data-lesson-id')
                    var data = {
                        grade_subject_name: copiedGradeSubjectName,
                        unit_name: copiedUnitName
                    }
                    editLessonDisplay(data)

                    axios.put(`/school_classes/${schoolClassId}/lessons/${lessonId}`, {
                        lesson: {grade_subject_unit_id: copiedGradeSubjectUnitId, grade_subject_id: copiedGradeSubjectId}
                    })
                    .then((res) =>{
                        if(res.status === 200){
                            var resData = res.data;
                            createDataSet(resData);
                            statusDisplay.innerHTML = "保存済み";
                        };
                    });
                } else {
                    // lessonがない場所にペーストする場合
                    statusDisplay.innerHTML = "保存中…"
                    var data = {
                        grade_subject_name: copiedGradeSubjectName,
                        unit_name: copiedUnitName
                    }
                    editLessonDisplay(data)
                    $(`#${Id}.new_lesson_menu`).addClass('hidden')
                    $(`#got_lesson${Id}`).removeClass('hidden')
                    $(`#copy_lesson_btn${Id}`).removeClass('hidden')
                    $(`#delete_lesson_btn${Id}`).removeClass('hidden')
                    axios.post(`/school_classes/${schoolClassId}/lessons`, {
                        lesson: {date: date, day_of_week: dayOfWeek, period: period, grade_subject_unit_id: copiedGradeSubjectUnitId, grade_subject_id: copiedGradeSubjectId}
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
};