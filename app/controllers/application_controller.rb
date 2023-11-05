class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?
    before_action :school_class_info, if: :user_signed_in?



    def school_class_info
      teacher = current_user.teacher
      @display_name = teacher.display_name
      school_class_teachers = SchoolClassTeacher.where(teachers_id: teacher.id)
      @current_user_classes = []
      school_class_teachers.each do |school_class_teacher|
        school_class = school_class_teacher.school_class
        class_name = school_class.grade_class
        school_class_id = school_class.id
        school_class_info = {
          class_name: class_name,
          school_class_id: school_class_id
        }
        @current_user_classes << school_class_info
      end
    end

    helper_method :display_name, :current_user_classes

    def after_sign_in_path_for(resource)
      school_class_teacher = SchoolClassTeacher.find_by(teachers_id: current_user.teacher)
      if school_class_teacher
        school_class = school_class_teacher.school_class
        school_class_path(school_class.id)
      else
        new_school_class_path
      end
    end

    def after_sign_up_path_for(resource)
      new_school_class_path
    end

    protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    end
  end