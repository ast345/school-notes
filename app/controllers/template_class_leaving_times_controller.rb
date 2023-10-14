class TemplateClassLeavingTimesController < ApplicationController
    before_action :authenticate_user!

    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @tempClassLeavingTime = school_class.template_class_leaving_times.build(leaving_time_params)
        @tempClassLeavingTime.save
        render json: @tempClassLeavingTime
    end

    def update
        @tempClassLeavingTime = TemplateClassLeavingTime.find(params[:id])
        @tempClassLeavingTime.update(leaving_time_params)
        render json: @tempClassLeavingTime
    end

    def destroy
        @tempClassLeavingTime = TemplateClassLeavingTime.find(params[:id])
        @tempClassLeavingTime.destroy!
    end
    
    private
    def leaving_time_params
        params.require(:temp_time).permit(:day_of_week, :leaving_time)
    end
end