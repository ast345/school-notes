import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

export function dragDropTempLesson (schoolClassId) {
    $('.lesson_box').draggable({
        revert: 'invalid',
        helper: function() {
          // ドラッグ中のヘルパー要素を作成
          var clone = $(this).clone();
          // カーソルスタイルを設定
          clone.css('cursor', 'grabbing');
          return clone;
        },
        zIndex: 2,
      });

      $('.lesson_box').droppable({
        accept: '.lesson_box',
        drop: function(event, ui) {
            var sourceBox = $(ui.draggable);
            var targetBox = $(this);
  
            targetBox.css('z-index', 1);

            // 中身を入れ替えるためのGotLessonクラスを取得
            var targetGotLesson = targetBox.find('.got_lesson');
            var sourceGotLesson = sourceBox.find('.got_lesson');
            var targetGotLessonDom = targetGotLesson[0];
            var sourceGotLessonDom = sourceGotLesson[0];

            // sourceBoxとtargetBoxの中身が新規作成なのか、既存のlessonがあるのかを判別
            var targetHasLesson = !targetGotLesson.hasClass('hidden');
            var sourceHasLesson = !sourceGotLesson.hasClass('hidden');

            // updateリクエストのためのデータセット
            // 要素のデータ属性を data() メソッドを使用して取得
            const targetDataSet = $(targetGotLesson).data();
            const sourceDataSet = $(sourceGotLesson).data();

            // deleteアクションに対応させるためのdelete_lesson_btnを取得
            var targetDeleteLessonBtn = targetBox.find('.delete_lesson_btn');
            var sourceDeleteLessonBtn = sourceBox.find('.delete_lesson_btn');
            var targetDeleteLessonBtnDom = targetDeleteLessonBtn[0];
            var sourceDeleteLessonBtnDom = sourceDeleteLessonBtn[0];

            // copyアクションに対応させるためのcopy_lesson_btnを取得
            //まだ
            var targetCopyLessonBtn = targetBox.find('.copy_lesson_btn');
            var sourceCopyLessonBtn = sourceBox.find('.copy_lesson_btn');
            var targetCopyLessonBtnDom = targetCopyLessonBtn[0];
            var sourceCopyLessonBtnDom = sourceCopyLessonBtn[0];

            // 変更前のtargetDataSetの内容
            const targetSubjectName = targetDataSet.subjectName;
            const targetGradeSubjectId = targetDataSet.gradeSubjectId;
            const targetLessonId = targetDataSet.templateLessonId;

            // 変更前のsourceDataSetの内容
            const sourceSubjectName = sourceDataSet.subjectName;
            const sourceGradeSubjectId = sourceDataSet.gradeSubjectId;
            const sourceLessonId = sourceDataSet.templateLessonId;

            // 教科名、単元名を取得
            var sourceLessonSubjectText = sourceBox.find('.lesson_subject').text();
            var targetLessonSubjectText = targetBox.find('.lesson_subject').text();

            const changeSourceBoxContent = () => {
                // lesson_subjectのテキスト内容を交換
                sourceBox.find('.lesson_subject').text(targetLessonSubjectText);
    
                //datasetの入れ替え
                sourceGotLessonDom.setAttribute('data-subject-name', targetSubjectName);
                sourceGotLessonDom.setAttribute('data-grade-subject-id', targetGradeSubjectId);
                sourceGotLessonDom.setAttribute('data-template-lesson-id', targetLessonId);
    
                sourceDeleteLessonBtnDom.setAttribute('data-template-lesson-id', targetLessonId);
    
                sourceCopyLessonBtnDom.setAttribute('data-grade-subject-id', targetGradeSubjectId);
    
                // データ属性を更新
                $(sourceGotLesson).data('subjectName', targetSubjectName);
                $(sourceGotLesson).data('gradeSubjectId', targetGradeSubjectId);
                $(sourceGotLesson).data('templateLessonId', targetLessonId);
              };

            const changeTargetBoxContent = () => {
                // lesson_subjectのテキスト内容を交換
                targetBox.find('.lesson_subject').text(sourceLessonSubjectText);

                //datasetの入れ替え
                targetGotLessonDom.setAttribute('data-subject-name', sourceSubjectName);
                targetGotLessonDom.setAttribute('data-grade-subject-id', sourceGradeSubjectId);
                targetGotLessonDom.setAttribute('data-target-lesson-id', sourceLessonId);

                targetDeleteLessonBtnDom.setAttribute('data-target-lesson-id', sourceLessonId);

                targetCopyLessonBtnDom.setAttribute('data-grade-subject-id', sourceGradeSubjectId);

                // データ属性を更新
                $(targetGotLesson).data('subjectName', sourceSubjectName);
                $(targetGotLesson).data('gradeSubjectId', sourceGradeSubjectId);
                $(targetGotLesson).data('templateLessonId', sourceLessonId);
            };

            var statusDisplay = document.getElementById('status_display');
            statusDisplay.innerHTML = "保存中…"

            if (targetHasLesson && sourceHasLesson) {
                changeTargetBoxContent();
                changeSourceBoxContent();
                // targetLessonのEdit
                const targetLessonReq = axios.put(`/school_classes/${schoolClassId}/template_lessons/${targetLessonId}`, {
                    template_lesson: {day_of_week: sourceDataSet.dayOfWeek, period: sourceDataSet.period}
                })
                // sourceLessonのEdit
                const sourceLessonReq = axios.put(`/school_classes/${schoolClassId}/template_lessons/${sourceLessonId}`, {
                    template_lesson: {day_of_week: targetDataSet.dayOfWeek, period: targetDataSet.period}
                })

                Promise.all([targetLessonReq, sourceLessonReq])
                .then((responses) => {
                    const [targetLessonResponse, sourceLessonResponse] = responses;
    
                    if (targetLessonResponse.status === 200 && sourceLessonResponse.status === 200) {
                      statusDisplay.innerHTML = "保存済み"
                    }
                })
                .catch((error) => {
                    window.alert('エラーが発生しました');
                });
              }
              else if (targetHasLesson && !sourceHasLesson) {
                // ドロップ先だけLessonを持っています
                // drop先を新規作成ボタンに変更
                targetBox.find('.got_lesson').addClass('hidden');
                targetBox.find('.new_lesson_menu').removeClass('hidden');
                targetBox.find('.copy_lesson_btn').addClass('hidden');
                targetBox.find('.delete_lesson_btn').addClass('hidden');


                // drag要素でlessonを表示
                sourceBox.find('.got_lesson').removeClass('hidden');
                sourceBox.find('.new_lesson_menu').addClass('hidden');
                sourceBox.find('.copy_lesson_btn').removeClass('hidden');
                sourceBox.find('.delete_lesson_btn').removeClass('hidden');
                changeSourceBoxContent();
                axios.put(`/school_classes/${schoolClassId}/template_lessons/${targetLessonId}`, {
                    template_lesson: {day_of_week: sourceDataSet.dayOfWeek, period: sourceDataSet.period}
                })
                .then((res) =>{
                    if(res.status === 200){
                        statusDisplay.innerHTML = "保存済み"
                    };
                });
              }
              else if (!targetHasLesson && sourceHasLesson) {
                // ドラッグ元だけLesssonを持っています
                // ドラッグ元を新規作成ボタンに変更
                sourceBox.find('.got_lesson').addClass('hidden');
                sourceBox.find('.new_lesson_menu').removeClass('hidden');
                sourceBox.find('.copy_lesson_btn').addClass('hidden');
                sourceBox.find('.delete_lesson_btn').addClass('hidden');
                // drop先でlessonを表示
                targetBox.find('.got_lesson').removeClass('hidden');
                targetBox.find('.new_lesson_menu').addClass('hidden');
                targetBox.find('.copy_lesson_btn').removeClass('hidden');
                targetBox.find('.delete_lesson_btn').removeClass('hidden');

                changeTargetBoxContent();
                axios.put(`/school_classes/${schoolClassId}/template_lessons/${sourceLessonId}`, {
                    template_lesson: {day_of_week: targetDataSet.dayOfWeek, period: targetDataSet.period}
                })
                .then((res) =>{
                    if(res.status === 200){
                        statusDisplay.innerHTML = "保存済み"
                    }});
              }

        }
      });
}