class MorningActivitiesController < ApplicationController
    before_action :authenticate_user!

    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @morning_act = school_class.morning_activities.build(morning_act_params)
        @morning_act.save
        render json: @morning_act
    end

    def update
        @morning_act = MorningActivity.find(params[:id])
        @morning_act.update(morning_act_params)
        render json: @morning_act
    end

    def destroy
        @morning_act = MorningActivity.find(params[:id])
        @morning_act.destroy!
    end

    private
    def morning_act_params
        morning_act_parameters = params.require(:morning_act).permit(:date, :day_of_week, :activity_name)
        morning_act_parameters[:activity_name] = morning_act_parameters[:activity_name].gsub("\n", "<br>")
        return morning_act_parameters
    end
end