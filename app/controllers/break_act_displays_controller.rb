class BreakActDisplaysController < ApplicationController
    before_action :authenticate_user!
    def create
        break_act = BreakActDisplay.new(break_act_params)
        if break_act.save
            redirect_to school_class_path(break_act.school_class_id)
            flash[:notice] = "設定を保存しました"
        else
            flash[:notice] = "設定を保存できませんでした"
        end
    end

    def update
        break_act = BreakActDisplay.find(params[:id])
        if break_act.update(break_act_params)
            redirect_to school_class_path(break_act.school_class_id)
            flash[:notice] = "設定を変更しました"
        else
            flash[:notice] = "設定を変更できませんでした"
        end
    end

    private
    def break_act_params
        params.require(:break_act_display).permit(:display).merge(school_class_id: params[:school_class_id])
    end
end