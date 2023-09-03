class ClassLeavingTimeController < ApplicationController
    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @ClassLeavingTime = school_class.class_leaving_times.build(leaving_time_params)
        @ClassLeavingTime.save
        render json: @ClassLeavingTime
    end

    private
    def leaving_time_params
        params.require(:time).permit(:date, :day_of_week, :leaving_time)
    end
end