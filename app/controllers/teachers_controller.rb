class TeachersController < ApplicationController
    before_action :authenticate_user!

    def new
        @teacher = current_user.build_teacher
    end
    
    def index
        @display_name = current_user.teacher ? current_user.teacher.display_name : "まだ設定されていません"
        if current_user.teacher
            @teacher = current_user.teacher
            if @teacher.school_classes
                @classes = @teacher.school_classes
            else
            end
        else
        end
    end

    def edit
        @teacher = Teacher.find(params[:id])
    end

    def create
        @user = current_user
        @teacher = current_user.build_teacher(teacher_params)
        if @teacher.save
            redirect_to teachers_path, notice: '保存できたよ'
        else
            redirect_to teachers_path, notice: '保存で来ませんでした'
        end
    end

    def update
        @teacher = Teacher.find(params[:id])
        @teacher.update(teacher_params)
        render json: @teacher
    end

    private
    def teacher_params
        params.require(:teacher).permit(:display_name, :user_id)
    end
end