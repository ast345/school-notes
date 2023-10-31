class SchoolClassesController < ApplicationController
    before_action :authenticate_user!
    before_action :hide_header

    def new
        @school_class = SchoolClass.new
        @grades = Grade.all.map { |grade| [grade.full_grade_name, grade.id] }
    end

    def create
        @school_class = SchoolClass.new(school_class_params)
        subjects = subjects_params[:subjects_data_set]
        if @school_class.save
            school_class_teacher = @school_class.school_class_teachers.build(teacher: current_user.teacher, teacher_type: "担任")
            if school_class_teacher.save
                subjects.each do |subject|
                    AssignedSubject.create(school_class_teachers_id: school_class_teacher.id, grade_subjects_id: subject[:grade_subject_id])
                    if subject[:text_book_id]
                        UsingText.create(school_class_id: @school_class.id, text_book_id: subject[:text_book_id])
                    end
                end
            end
            render json: @school_class
        else
          render :new
        end
    end

    def edit
        @school_class = SchoolClass.find(params[:id])
        @grades = Grade.all.map { |grade| [grade.full_grade_name, grade.id] }
        grade_to_display = @grades.find { |grade| grade[1] == @school_class.grade_id }
        @default_grade_id = grade_to_display[1]
        @default_class_name = @school_class.class_name


        teacher = SchoolClassTeacher.find_by(teachers_id: current_user.teacher.id, school_classes_id: @school_class.id)
        assigned_subjects = AssignedSubject.where(school_class_teachers_id: teacher.id)
        using_texts = UsingText.where(school_class_id: @school_class.id)
        grade_subjects = GradeSubject.where(grades_id: @default_grade_id)
        @subjects = []
        grade_subjects.each do |grade_subject|
            grade_subject_id = grade_subject.id
            subject_name = grade_subject.subject.subject_name

            if assigned_subjects.find_by(grade_subjects_id: grade_subject_id)
                has_assigned = true
            else
                has_assigned =false
            end

            text_books = grade_subject.text_books
            text_books_data = []
            using_text_id = nil
            text_books.each do |text_book|
                text_book_id = text_book.id
                text_book_name = text_book.text_book_name
                text_book_comp = text_book.text_book_comp.abbreviation

                using_text = using_texts.find_by(text_book_id: text_book_id)
                if using_text
                    using_text_id = text_book_id
                end
                text_book_data = ["#{text_book_name}(#{text_book_comp})", text_book_id]

                text_books_data << text_book_data
            end
            # レスポンスデータを作成
            subject_data = {
                grade_subject_id: grade_subject_id,
                subject_name: subject_name,
                has_assigned: has_assigned,
                using_text_id: using_text_id,
                text_books: text_books_data
            }

            # レスポンスデータを配列に追加
            @subjects << subject_data
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

    def destroy
        school_class = SchoolClass.find(params[:id])
        school_class.destroy!
        redirect_to teachers_path, alert: "クラスを削除しました"
    end

    def show
        @school_class = SchoolClass.find(params[:id])
        gon.school_class_id = @school_class.id
        if params[:start_of_week]
            @start_of_week = params[:start_of_week].to_date
        else
            @start_of_week = Date.today.beginning_of_week
        end
        gon.start_of_week = @start_of_week

        lesson_wday = LessonWday.where(school_class_id: @school_class.id, start_of_week: @start_of_week).first
        gon.lesson_wday = lesson_wday
        if lesson_wday
            @display_wday = []
            @display_wday << 1 if lesson_wday.monday
            @display_wday << 2 if lesson_wday.tuesday
            @display_wday << 3 if lesson_wday.wednesday
            @display_wday << 4 if lesson_wday.thursday
            @display_wday << 5 if lesson_wday.friday
            @display_wday << 6 if lesson_wday.saturday
            @display_wday << 0 if lesson_wday.sunday
        else
            @display_wday = [1,2,3,4,5]
        end

        @end_of_week = @start_of_week.end_of_week
        @this_week_lessons = @school_class.lessons.where(date: @start_of_week..@end_of_week)
        gon.this_week_lessons = @this_week_lessons
        @this_week_events = @school_class.events.where(date: @start_of_week..@end_of_week)
        @this_week_date_items = @school_class.date_items.where(date: @start_of_week..@end_of_week)
        @this_week_class_leaving_times = @school_class.class_leaving_times.where(date: @start_of_week..@end_of_week)
        @this_week_morning_activities = @school_class.morning_activities.where(date: @start_of_week..@end_of_week)
        current_teacher = current_user.teacher
        current_class_teacher = SchoolClassTeacher.where(teachers_id: current_teacher.id, school_classes_id: @school_class.id).first
        assigned_subjects = current_class_teacher.assigned_subjects
        @subject_names = []
        @grade_subject_ids = []
        assigned_subjects.each do |assigned_subject|
            grade_subject = assigned_subject.grade_subject
            @subject_names << grade_subject.subject.subject_name
            @grade_subject_ids << grade_subject.id
        end

        gon.grade_subject_ids = @grade_subject_ids

        respond_to do |format|
            format.html
            format.pdf do
              render pdf: '時間割',
                     layout: 'pdf.html',
                     template: 'school_classes/show.pdf',
                     encording: 'UTF-8',
                     show_as_html: params.key?('debug')
            end
          end
    end

    private
    def school_class_params
        params.require(:school_class).permit(:grade_id, :class_name)
    end

    def subjects_params
        params.require(:subjects).permit(subjects_data_set: [:grade_subject_id, :text_book_id])
    end

    def hide_header
        @show_header = true
    end
end