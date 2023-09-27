class TemplateLessonsController < ApplicationController
    before_action :authenticate_user!
    def index
        @school_class = SchoolClass.find(params[:school_class_id])
        gon.school_class_id = @school_class.id
        @template_lessons = @school_class.template_lessons
        @start_of_week = params[:start_of_week]

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

    def update
        @template_lesson = TemplateLesson.find(params[:id])
        @template_lesson.update(template_lesson_params)
        render json: @template_lesson.as_json(methods: [:subject_name])
    end

    def destroy
        template_lesson = TemplateLesson.find(params[:id])
        template_lesson.destroy!
    end

    def get_temp
        school_class = SchoolClass.find(params[:school_class_id])
        template_lessons = school_class.template_lessons
        start_of_week = params[:start_of_week].to_date
        end_of_week = start_of_week.end_of_week
        this_week_lessons = school_class.lessons.where(date: start_of_week..end_of_week)
        filtered_template_lessons = remove_duplicate_template_lessons(template_lessons, this_week_lessons)
        dates = (start_of_week..end_of_week).map { |date| [date, date.wday]}
        add_dates_to_template_lessons(filtered_template_lessons, dates)
        render json: @lessons_from_template
    end

    private
    def template_lesson_params
        params.require(:template_lesson).permit(:day_of_week, :period, :grade_subject_id)
    end

    def remove_duplicate_template_lessons(template_lessons, this_week_lessons)
        this_week_lesson_periods = this_week_lessons.map { |lesson| [lesson.day_of_week, lesson.period] }
        template_lessons.reject do |template_lesson|
            this_week_lesson_periods.include?([template_lesson.day_of_week, template_lesson.period])
        end
    end

    def add_dates_to_template_lessons(filtered_template_lessons, dates)
        

        day_mapping = {
            "sunday" => 0,
            "monday" => 1,
            "tuesday" => 2,
            "wednesday" => 3,
            "thursday" => 4,
            "friday" => 5,
            "saturday" => 6
        }
        @lessons_from_template = []
        filtered_template_lessons.each do |template_lesson|
          matching_date = dates.find { |date| date[1] == day_mapping[template_lesson.day_of_week] }
          @lessons_from_template << {date: matching_date[0], day_of_week: template_lesson.day_of_week, period: template_lesson.period, grade_subject_id: template_lesson.grade_subject_id}
        end
      end
end