class AssignedSubjectsController < ApplicationController
    before_action :authenticate_user!

    def new
        school_class_id = params[:school_class_id]
        current_class_teacher_id = params[:current_class_teacher_id]
        @school_class = SchoolClass.find(school_class_id)
        all_grade_subjects = GradeSubject.where(grades_id: @school_class.grade_id)
        current_subject_ids = AssignedSubject.where(school_class_teachers_id: current_class_teacher_id).pluck(:grade_subjects_id)
        # @all_grade_subjectsからassigned_grade_subject_idsに含まれるIDを除外して、新たに@grade_subjectsに代入
        @grade_subjects = all_grade_subjects.where.not(id: current_subject_ids)
    end

    def create
        school_class_id = params[:school_class_id]
        selected_grade_subject_ids = params[:school_class][:grade_subject_ids]
        current_class_teacher = SchoolClassTeacher.where(teachers_id: current_user.teacher.id, school_classes_id: school_class_id).first
        selected_grade_subject_ids.each do |grade_subject_id|
          AssignedSubject.create(school_class_teachers_id: current_class_teacher.id, grade_subjects_id: grade_subject_id)
        end
    
        redirect_to teachers_path, notice: "担当教科が登録できました"
    end

    def destroy
        assigned_subject = AssignedSubject.find(params[:id])
        assigned_subject_name = assigned_subject.grade_subject.subject.subject_name
        assigned_subject.destroy!
        redirect_to teachers_path, notice: "#{assigned_subject_name}の担当を外しました"
    end
end