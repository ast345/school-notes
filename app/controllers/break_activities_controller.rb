class BreakActivitiesController < ApplicationController
    before_action :authenticate_user!

    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @break_act = school_class.break_activities.build(break_act_params)
        @break_act.save
        render json: @break_act
    end

    def update
        @break_act = BreakActivity.find(params[:id])
        @break_act.update(break_act_params)
        render json: @break_act
    end

    def destroy
        @break_act = BreakActivity.find(params[:id])
        @break_act.destroy!
    end

    private
    def break_act_params
        break_act_parameters = params.require(:break_act).permit(:date, :day_of_week, :activity_name)
        break_act_parameters[:activity_name] = break_act_parameters[:activity_name].gsub("\n", "<br>")
        return break_act_parameters
    end
end