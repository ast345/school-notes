# == Schema Information
#
# Table name: template_lesson_classes
#
#  id                 :bigint           not null, primary key
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  school_class_id    :bigint           not null
#  template_lesson_id :bigint           not null
#
# Indexes
#
#  index_template_lesson_classes_on_school_class_id     (school_class_id)
#  index_template_lesson_classes_on_template_lesson_id  (template_lesson_id)
#
require 'test_helper'

class TemplateLessonClassTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
