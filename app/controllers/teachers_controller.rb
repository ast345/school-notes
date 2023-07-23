class TeachersController < ApplicationController
    before_action :authenticate_user!

    def new
        @teacher = current_user.build_teacher
    end
    
    def create
        @user = current_user
        @teacher = current_user.build_teacher(teacher_params)
        if @teacher.save
            redirect_to root_path, notice: '保存できたよ'
        else
            flash.now[:erron] = '保存に失敗しました'
            render :new
        end
    end

    private
    def teacher_params
        params.require(:teacher).permit(:display_name, :user_id)
    end
end