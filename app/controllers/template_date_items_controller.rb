class TemplateDateItemsController < ApplicationController
    before_action :authenticate_user!
    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @temp_item = school_class.template_date_items.build(temp_date_item_params)
        @temp_item.save
        render json: @temp_item
    end

    def update
        @temp_item = TemplateDateItem.find(params[:id])
        @temp_item.update(temp_date_item_params)
        render json: @temp_item
    end

    def destroy
        @temp_item = TemplateDateItem.find(params[:id])
        @temp_item.destroy!
    end

    def get_temp
        school_class = SchoolClass.find(params[:school_class_id])
        template_date_items = school_class.template_date_items
        start_of_week = params[:start_of_week].to_date
        end_of_week = start_of_week.end_of_week
        this_week_date_items = school_class.date_items.where(date: start_of_week..end_of_week)
        filtered_template_date_items = remove_duplicate_template_date_item(template_date_items, this_week_date_items)
        dates = (start_of_week..end_of_week).map { |date| [date, date.wday]}
        add_dates_to_template_date_items(filtered_template_date_items, dates)
        render json: @date_items_from_template
    end

    private
    def temp_date_item_params
        temp_item_parameters = params.require(:temp_item).permit(:day_of_week, :item_name)
        temp_item_parameters[:item_name] = temp_item_parameters[:item_name].gsub("\n", "<br>")
        return temp_item_parameters
    end

    def remove_duplicate_template_date_item(template_date_items, this_week_date_items)
        this_week_date_item_wdays = this_week_date_items.map { |item| [item.day_of_week] }
        template_date_items.reject do |template_date_item|
            this_week_date_item_wdays.include?([template_date_item.day_of_week])
        end
    end

    def add_dates_to_template_date_items(filtered_template_date_items, dates)
        day_mapping = {
            "sunday" => 0,
            "monday" => 1,
            "tuesday" => 2,
            "wednesday" => 3,
            "thursday" => 4,
            "friday" => 5,
            "saturday" => 6
        }
        @date_items_from_template = []
        filtered_template_date_items.each do |template_date_item|
          matching_date = dates.find { |date| date[1] == day_mapping[template_date_item.day_of_week] }
          @date_items_from_template << {date: matching_date[0], day_of_week: template_date_item.day_of_week, item_name: template_date_item.item_name}
        end
    end
end