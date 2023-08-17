class LessonSerializer < ActiveModel::Serializer
    attributes :id, :grade_subject_unit_id, :grade_subject_id
end