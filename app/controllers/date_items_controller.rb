class DateItemsController < ApplicationController
    before_action :authenticate_user!

    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @item = school_class.date_items.build(date_item_params)
        @item.save
        render json: @item
    end

    def update
        @item = DateItem.find(params[:id])
        @item.update(date_item_params)
        render json: @item
    end

    def destroy
        @item = DateItem.find(params[:id])
        @item.destroy!
    end

    private
    def date_item_params
        item_parameters = params.require(:item).permit(:date, :day_of_week, :item_name)
        item_parameters[:item_name] = item_parameters[:item_name].gsub("\n", "<br>")
        return item_parameters
    end
end