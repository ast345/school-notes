class LessonsController < ApplicationController
    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @lesson = school_class.lessons.build(lesson_params)
        if @lesson.save
            lesson_class = school_class.lesson_classes.build(school_class_id: school_class.id,lesson_id: @lesson.id)
            lesson_class.save
        end
        render json: @lesson
    end

    private
    def lesson_params
        params.require(:lesson).permit(:date, :day_of_week, :period, :grade_subject_unit_id, :grade_subject_id)
    end

end