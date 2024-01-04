class TemplateBreakActivitiesController < ApplicationController
    before_action :authenticate_user!
    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @temp_break_act = school_class.template_break_activities.build(temp_break_act_params)
        @temp_break_act.save
        render json: @temp_break_act
    end

    def update
        @temp_break_act = TemplateBreakActivity.find(params[:id])
        @temp_break_act.update(temp_break_act_params)
        render json: @temp_break_act
    end

    def destroy
        @temp_break_act = TemplateBreakActivity.find(params[:id])
        @temp_break_act.destroy!
    end

    private
    def temp_break_act_params
        temp_break_act_parameters = params.require(:temp_break_act).permit(:day_of_week, :activity_name)
        temp_break_act_parameters[:activity_name] = temp_break_act_parameters[:activity_name].gsub("\n", "<br>")
        return temp_break_act_parameters
    end
end