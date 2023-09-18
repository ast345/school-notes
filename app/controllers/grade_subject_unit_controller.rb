class GradeSubjectUnitController < ApplicationController
    def get_grade_subject_units
        grade_subject_units = GradeSubjectUnit.where(grade_subject_id: params[:grade_subject_id])
        render json: grade_subject_units
    end
end