class SchoolClassesController < ApplicationController
    before_action :authenticate_user!

    def new
        @school_class = SchoolClass.new
        @grades = Grade.all.map { |grade| [grade.full_grade_name, grade.id] }
    end

    def create
        @school_class = SchoolClass.new(school_class_params)
        if @school_class.save
            school_class_teacher = @school_class.school_class_teachers.build(teacher: current_user.teacher, teacher_type: "担任")
            school_class_teacher.save
          # 保存成功時の処理
            redirect_to teachers_path, notice: 'クラスを作成できました'
        else
          render :new
        end
    end

    def edit
        @school_class = SchoolClass.find(params[:id])
        @grades = Grade.all.map { |grade| [grade.full_grade_name, grade.id] }
        grade_to_display_first = @grades.find { |grade| grade[1] == @school_class.grade_id }
        if grade_to_display_first.present?
            @grades.delete(grade_to_display_first)  # 指定した学年を一旦削除
            @grades.unshift(grade_to_display_first)  # 指定した学年を配列の先頭に追加
        end
    end

    def update
        @school_class = SchoolClass.find(params[:id])
        @school_class.update(school_class_params)
        if @school_class.save
            redirect_to teachers_path, notice: 'クラス情報を更新できました'
        else
            render :edit, notice: 'クラス情報を更新できませんでした'
        end
    end

    def destroy
        school_class = SchoolClass.find(params[:id])
        school_class.destroy!
        redirect_to teachers_path, alert: "クラスを削除しました"
    end

    def show
        @school_class = SchoolClass.find(params[:id])
        gon.school_class_id = @school_class.id
        if params[:start_of_week]
            @start_of_week = params[:start_of_week].to_date
        else
            @start_of_week = Date.today.beginning_of_week
        end
        gon.start_of_week = @start_of_week

        lesson_wday = LessonWday.where(school_class_id: @school_class.id, start_of_week: @start_of_week).first
        gon.lesson_wday = lesson_wday
        if lesson_wday
            @display_wday = []
            @display_wday << 1 if lesson_wday.monday
            @display_wday << 2 if lesson_wday.tuesday
            @display_wday << 3 if lesson_wday.wednesday
            @display_wday << 4 if lesson_wday.thursday
            @display_wday << 5 if lesson_wday.friday
            @display_wday << 6 if lesson_wday.saturday
            @display_wday << 0 if lesson_wday.sunday
        else
            @display_wday = [1,2,3,4,5]
        end

        @end_of_week = @start_of_week.end_of_week
        @this_week_lessons = @school_class.lessons.where(date: @start_of_week..@end_of_week)
        gon.this_week_lessons = @this_week_lessons
        @this_week_events = @school_class.events.where(date: @start_of_week..@end_of_week)
        @this_week_date_items = @school_class.date_items.where(date: @start_of_week..@end_of_week)
        @this_week_class_leaving_times = @school_class.class_leaving_times.where(date: @start_of_week..@end_of_week)
        current_teacher = current_user.teacher
        current_class_teacher = SchoolClassTeacher.where(teachers_id: current_teacher.id, school_classes_id: @school_class.id).first
        assigned_subjects = current_class_teacher.assigned_subjects
        @subject_names = []
        @grade_subject_ids = []
        assigned_subjects.each do |assigned_subject|
            grade_subject = assigned_subject.grade_subject
            @subject_names << grade_subject.subject.subject_name
            @grade_subject_ids << grade_subject.id
        end

        gon.grade_subject_ids = @grade_subject_ids

        respond_to do |format|
            format.html  { redirect_to action: :show, format: :pdf, debug: true }
            format.pdf do
              render pdf: '時間割', #pdfファイルの名前。これがないとエラーが出ます
                     layout: 'pdf.html', #レイアウトファイルの指定。views/layoutsが読まれます。
                     template: 'school_classes/show.pdf', #テンプレートファイルの指定。viewsフォルダが読み込まれます。
                     encording: 'UTF-8',
                     show_as_html: params.key?('debug')
            end
          end
    end

    private
    def school_class_params
        params.require(:school_class).permit(:grade_id, :class_name)
    end
end