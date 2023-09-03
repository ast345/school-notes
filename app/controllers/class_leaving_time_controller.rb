class ClassLeavingTimeController < ApplicationController
    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @classLeavingTime = school_class.class_leaving_times.build(leaving_time_params)
        @classLeavingTime.save
        render json: @classLeavingTime
    end

    def update
        @classLeavingTime = ClassLeavingTime.find(params[:id])
        @classLeavingTime.update(leaving_time_params)
        render json: @classLeavingTime
    end

    private
    def leaving_time_params
        params.require(:time).permit(:date, :day_of_week, :leaving_time)
    end
end