class TemplateLessonsController < ApplicationController
    before_action :authenticate_user!
    def index
        @school_class = SchoolClass.find(params[:school_class_id])
        gon.school_class_id = @school_class.id
        @template_lessons = @school_class.template_lessons

        @japanese_weekdays = ["日", "月", "火", "水", "木", "金", "土"]

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

    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @template_lesson = school_class.template_lessons.build(template_lesson_params)
        if @template_lesson.save
            template_lesson_class = school_class.template_lesson_classes.build(school_class_id: school_class.id, template_lesson_id: @template_lesson.id)
            template_lesson_class.save
        end
        render json: @template_lesson.as_json(methods: [:subject_name])
    end

    private
    def template_lesson_params
        params.require(:template_lesson).permit(:day_of_week, :period, :grade_subject_id)
    end
end