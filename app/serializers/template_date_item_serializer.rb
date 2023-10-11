class TemplateDateItemSerializer < ActiveModel::Serializer
    attributes :id, :day_of_week, :item_name
end