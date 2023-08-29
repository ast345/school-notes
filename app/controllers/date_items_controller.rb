class DateItemsController < ApplicationController
    before_action :authenticate_user!

    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @item = school_class.date_items.build(date_item_params)
        @item.save
        render json: @item
        # serializer作りから
    end

    # def update
    #     @event = Event.find(params[:id])
    #     @event.update(event_params)
    #     render json: @event
    # end

    # def destroy
    #     @event = Event.find(params[:id])
    #     @event.destroy!
    # end

    private
    def date_item_params
        params.require(:item).permit(:date, :day_of_week, :item_name)
    end
end