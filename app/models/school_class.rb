# == Schema Information
#
# Table name: school_classes
#
#  id         :bigint           not null, primary key
#  class_name :string
#  token      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  grade_id   :bigint           not null
#
# Indexes
#
#  index_school_classes_on_grade_id  (grade_id)
#  index_school_classes_on_token     (token) UNIQUE
#
class SchoolClass < ApplicationRecord
    belongs_to :grade
    has_many :school_class_teachers, foreign_key: 'school_classes_id', dependent: :destroy
    has_many :teachers, through: :school_class_teachers
    has_many :using_texts, dependent: :destroy
    has_many :text_books, through: :using_texts
    has_many :lesson_classes, dependent: :destroy
    has_many :lessons, through: :lesson_classes
    has_many :template_lesson_classes, dependent: :destroy
    has_many :template_lessons, through: :template_lesson_classes
    has_many :events, dependent: :destroy
    has_many :date_items, dependent: :destroy
    has_many :class_leaving_times, dependent: :destroy
    has_many :morning_activities, dependent: :destroy
    has_many :break_activities, dependent: :destroy
    has_many :lesson_wdays, dependent: :destroy
    has_many :template_morning_activities, dependent: :destroy
    has_many :template_date_items, dependent: :destroy
    has_many :template_class_leaving_times, dependent: :destroy
    has_many :template_break_activities, dependent: :destroy
    has_one :lesson_period, dependent: :destroy
    has_one :break_act_display, dependent: :destroy

    accepts_nested_attributes_for :school_class_teachers

    validates :grade_id, presence: true
    validates :class_name, presence: true

    def grade_class
        grade_id = self.grade_id
        if grade_id == 1
            "1ねん#{self.class_name}"
        elsif grade_id ==2
            "2ねん#{self.class_name}"
        else
            grade_name = self.grade.grade_name.gsub('生', '')
            "#{grade_name}#{self.class_name}"
        end
    end

    def grade_class_for_share
        grade_id = self.grade_id
        if grade_id == 1
            "1ねん#{self.class_name}"
        elsif grade_id ==2
            "2ねん#{self.class_name}"
        elsif grade_id == 13 || grade_id == 14 || grade_id == 15
            teacher_name = self.school_class_teachers.first.teacher.display_name
            grade_name = self.grade.grade_name
            "#{grade_name}(#{teacher_name})"
        else
            grade_name = self.grade.grade_name.gsub('生', '')
            "#{grade_name}#{self.class_name}"
        end
    end
end
