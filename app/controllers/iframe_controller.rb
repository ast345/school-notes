class IframeController < ApplicationController
    def index
        @show_header = false
        @school_class = SchoolClass.find(params[:school_class_id])

        if params[:start_of_week]
            @start_of_week = params[:start_of_week].to_date
        else
            @start_of_week = Date.today.beginning_of_week
        end
        @end_of_week = @start_of_week.end_of_week

        lesson_wday = LessonWday.where(school_class_id: @school_class.id, start_of_week: @start_of_week).first
        if lesson_wday
            @display_wday = []
            @display_wday << 1 if lesson_wday.monday
            @display_wday << 2 if lesson_wday.tuesday
            @display_wday << 3 if lesson_wday.wednesday
            @display_wday << 4 if lesson_wday.thursday
            @display_wday << 5 if lesson_wday.friday
            @display_wday << 6 if lesson_wday.saturday
            @display_wday << 0 if lesson_wday.sunday
        else
            @display_wday = [1,2,3,4,5]
        end

        @this_week_events = @school_class.events.where(date: @start_of_week..@end_of_week)
        @this_week_lessons = @school_class.lessons.where(date: @start_of_week..@end_of_week)
        @this_week_date_items = @school_class.date_items.where(date: @start_of_week..@end_of_week)
        @this_week_class_leaving_times = @school_class.class_leaving_times.where(date: @start_of_week..@end_of_week)
    end
end