class EventsController < ApplicationController
    before_action :authenticate_user!

    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @event = school_class.events.build(event_params)
        @event.save
        render json: @event
    end

    private
    def event_params
        params.require(:event).permit(:date, :day_of_week, :event_name)
    end
end