class TemplateMorningActivitiesController < ApplicationController
    before_action :authenticate_user!
    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @temp_morning_act = school_class.template_morning_activities.build(temp_morning_act_params)
        @temp_morning_act.save
        render json: @temp_morning_act
    end

    def update
        @temp_morning_act = TemplateMorningActivity.find(params[:id])
        @temp_morning_act.update(temp_morning_act_params)
        render json: @temp_morning_act
    end

    def destroy
        @temp_morning_act = TemplateMorningActivity.find(params[:id])
        @temp_morning_act.destroy!
    end

    private
    def temp_morning_act_params
        temp_morning_act_parameters = params.require(:temp_morning_act).permit(:day_of_week, :activity_name)
        temp_morning_act_parameters[:activity_name] = temp_morning_act_parameters[:activity_name].gsub("\n", "<br>")
        return temp_morning_act_parameters
    end
end