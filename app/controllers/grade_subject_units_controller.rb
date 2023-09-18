class GradeSubjectUnitsController < ApplicationController
    def create
        @grade_subject_unit = GradeSubjectUnit.new(grade_subject_unit_params)
        @grade_subject_unit.save!
        render json: @grade_subject_unit
    end

    private
    def grade_subject_unit_params
        params.require(:grade_subject_unit).permit(:unit_name, :grade_subject_id)
    end
end