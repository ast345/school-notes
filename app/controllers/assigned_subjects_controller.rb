class AssignedSubjectsController < ApplicationController
    before_action :authenticate_user!

    def new
        school_class_id = params[:school_class_id]
        @school_class = SchoolClass.find(school_class_id)
        @grade_subjects = GradeSubject.where(grades_id: @school_class.grade_id)
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
end