class SchoolClassTeachersController < ApplicationController
    before_action :authenticate_user!
    def create
        school_class = SchoolClass.find_by(token: params[:class_token])
        current_teacher = current_user.teacher
        follow = school_class.school_class_teachers.build(teachers_id: current_teacher.id, school_classes_id: school_class.id, teacher_type: "フォロー")
        if follow.save
            flash[:notice] = "フォローしました"
        else
            flash[:notice] = "フォローできませんでした"
        end
        redirect_to school_class_share_teacher_path(token: params[:class_token])
    end

    def destroy
        school_class_teacher = SchoolClassTeacher.find(params[:id])
        if school_class_teacher.destroy!
            flash[:notice] = "フォローを外しました"
        else
            flash[:notice] = "フォローを外せませんでした"
        end
        redirect_to request.referrer
    end
end