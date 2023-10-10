class TemplateMorningActivitySerializer < ActiveModel::Serializer
    attributes :id, :day_of_week, :activity_name
end