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

    private
    def temp_date_item_params
        temp_item_parameters = params.require(:temp_item).permit(:day_of_week, :item_name)
        temp_item_parameters[:item_name] = temp_item_parameters[:item_name].gsub("\n", "<br>")
        return temp_item_parameters
    end
end