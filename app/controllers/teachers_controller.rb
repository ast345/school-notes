class TeachersController < ApplicationController
    before_action :authenticate_user!
    before_action :hide_header

    def update
        @teacher = Teacher.find(params[:id])
        if @teacher.update(teacher_params)
            flash[:notice] = "表示名を変更しました"
            redirect_to request.referrer
        else
            flash[:notice] = "表示名を変更できませんでした"
        end
    end

    private
    def teacher_params
        params.require(:teacher).permit(:display_name, :user_id)
    end

    def hide_header
        @show_header = true
    end
end