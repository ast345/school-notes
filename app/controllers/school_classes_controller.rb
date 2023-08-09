class SchoolClassesController < ApplicationController
    before_action :authenticate_user!

    def new
        @school_class = SchoolClass.new
        @grades = Grade.all.map { |grade| [grade.full_grade_name, grade.id] }
    end
    
    def create
        @school_class = SchoolClass.new(school_class_params)
        if @school_class.save
            school_class_teacher = @school_class.school_class_teachers.build(teacher: current_user.teacher, teacher_type: "担任")
            school_class_teacher.save
          # 保存成功時の処理
            redirect_to teachers_path, notice: 'クラスを作成できました'
        else
          render :new
        end
    end

    def edit
        @school_class = SchoolClass.find(params[:id])
        @grades = Grade.all.map { |grade| [grade.full_grade_name, grade.id] }
        grade_to_display_first = @grades.find { |grade| grade[1] == @school_class.grade_id }
        if grade_to_display_first.present?
            @grades.delete(grade_to_display_first)  # 指定した学年を一旦削除
            @grades.unshift(grade_to_display_first)  # 指定した学年を配列の先頭に追加
        end
    end

    def update
        @school_class = SchoolClass.find(params[:id])
        @school_class.update(school_class_params)
        if @school_class.save
            redirect_to teachers_path, notice: 'クラス情報を更新できました'
        else
            render :edit, notice: 'クラス情報を更新できませんでした'
        end
    end
    
    private
    
    def school_class_params
        params.require(:school_class).permit(:grade_id, :class_name)
    end
end