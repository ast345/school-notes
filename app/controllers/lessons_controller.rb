class LessonsController < ApplicationController
    before_action :authenticate_user!
    def create
        school_class = SchoolClass.find(params[:school_class_id])
        grade_id = school_class.grade.id
        @lesson = school_class.lessons.build(lesson_params)
        if @lesson.save
            lesson_class = school_class.lesson_classes.build(school_class_id: school_class.id,lesson_id: @lesson.id)
            lesson_class.save
        end
        unit_name = @lesson.unit_name
        grade_subject_name = @lesson.grade_subject_name(grade_id)
        json_data = @lesson.as_json
        json_data['unit_name'] = unit_name
        json_data['grade_subject_name'] = grade_subject_name
        render json: json_data
    end

    def update
        @lesson = Lesson.find(params[:id])
        @lesson.update(lesson_params)

        school_class = SchoolClass.find(params[:school_class_id])
        grade_id = school_class.grade.id
        unit_name = @lesson.unit_name
        grade_subject_name = @lesson.grade_subject_name(grade_id)
        json_data = @lesson.as_json
        json_data['unit_name'] = unit_name
        json_data['grade_subject_name'] = grade_subject_name
        render json: json_data
    end

    def destroy
        lesson = Lesson.find(params[:id])
        lesson.destroy!
    end

    private
    def lesson_params
        params.require(:lesson).permit(:date, :day_of_week, :period, :grade_subject_unit_id, :grade_subject_id)
    end

end