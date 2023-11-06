class LessonPeriodsController < ApplicationController
    def create
        @lesson_period = LessonPeriod.new(lesson_period_params)
        if @lesson_period.save
            redirect_to school_class_path(@lesson_period.school_class_id)
            flash[:notice] = "設定を保存しました"
        else
            flash[:notice] = "設定を保存できませんでした"
        end
    end

    def update
        @lesson_period = LessonPeriod.find(params[:id])
        if @lesson_period.update(lesson_period_params)
            redirect_to school_class_path(@lesson_period.school_class_id)
            flash[:notice] = "設定を変更しました"
        else
            flash[:notice] = "設定を変更できませんでした"
        end
    end

    private
    def lesson_period_params
        params.require(:lesson_period).permit(:start_of_period, :end_of_period).merge(school_class_id: params[:school_class_id])
    end
end