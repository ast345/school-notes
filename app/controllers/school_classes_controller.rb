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
        @end_of_week = @start_of_week.end_of_week

        @this_week_lessons = @school_class.lessons.where(date: @start_of_week..@end_of_week)
        @this_week_events = @school_class.events.where(date: @start_of_week..@end_of_week)

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
    end

    private
    def school_class_params
        params.require(:school_class).permit(:grade_id, :class_name)
    end
end