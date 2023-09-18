class LessonWdaysController < ApplicationController
    before_action :authenticate_user!
    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @lessonWday = school_class.lesson_wdays.build(wday_params)
        @lessonWday.save
    end

    def update
        @lessonWday = LessonWday.find(params[:id])
        @lessonWday.update(wday_params)
    end

    private 
    def wday_params
        params.require(:wday).permit(:start_of_week, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday)
    end

end