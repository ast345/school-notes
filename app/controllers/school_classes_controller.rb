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
        else
          render :new
        end
    end
    
    private
    
    def school_class_params
        params.require(:school_class).permit(:grade_id, :class_name)
    end
end