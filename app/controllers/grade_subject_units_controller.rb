class GradeSubjectUnitsController < ApplicationController
    before_action :authenticate_user!
    def create
        school_class =SchoolClass.find(grade_subject_unit_params[:school_class_id])
        grade_subject_id = grade_subject_unit_params[:grade_subject_id]
        unit_name = grade_subject_unit_params[:unit_name]
        text_books = school_class.text_books
        this_subject_text_id = nil
        text_books.each do|text_book|
            text_book_grade_subject_id = text_book.grade_subject_id
            if grade_subject_id == text_book_grade_subject_id
                this_subject_text_id = text_book.id
            end
        end

        if this_subject_text_id
            @grade_subject_unit = GradeSubjectUnit.new(text_book_id: this_subject_text_id, grade_subject_id: grade_subject_id, unit_name: unit_name)
        else
            @grade_subject_unit = GradeSubjectUnit.new(grade_subject_id: grade_subject_id, unit_name: unit_name)
        end
        if @grade_subject_unit.save
            # 保存成功時の処理
            render json: @grade_subject_unit, status: :created
          else
            # 保存失敗時の処理
            if this_subject_text_id
                duplicated_grade_subject_unit = GradeSubjectUnit.find_by(text_book_id: this_subject_text_id, grade_subject_id: grade_subject_id, unit_name: unit_name)
            else
                duplicated_grade_subject_unit = GradeSubjectUnit.new(grade_subject_id: grade_subject_id, unit_name: unit_name)
            end
            render json: { duplicated_unit_id: duplicated_grade_subject_unit.id }, status: :unprocessable_entity
          end
    end

    def update
        @grade_subject_unit = GradeSubjectUnit.find(params[:id])
        if @grade_subject_unit.update(grade_subject_unit_params)
          respond_to do |format|
            format.json { render json: @grade_subject_unit.to_json }
          end
        end
    end

    def destroy
        grade_subject_unit = GradeSubjectUnit.find(params[:id])
        grade_subject_unit.destroy!
    end

    private
    def grade_subject_unit_params
        params.require(:grade_subject_unit).permit(:unit_name, :grade_subject_id, :school_class_id)
    end
end