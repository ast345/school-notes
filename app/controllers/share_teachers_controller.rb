class ShareTeachersController < ApplicationController

    def index
        @school_class = SchoolClass.find_by(token: params[:token])
        gon.school_class_id = @school_class.id
        date = Date.today
        @start_of_week = date.beginning_of_week
        pramas_exist =false
        if params[:start_of_week]
            @start_of_week = params[:start_of_week].to_date
            params_exist = true
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
        @lesson_period = @school_class.lesson_period
        if @lesson_period
            @start_of_period = @lesson_period.start_of_period
            @end_of_period = @lesson_period.end_of_period
        else
            @lesson_period = LessonPeriod.new
            @start_of_period = 1
            @end_of_period = 6
        end

        @this_week_events = @school_class.events.where(date: @start_of_week..@end_of_week)
        @this_week_lessons = @school_class.lessons.where(date: @start_of_week..@end_of_week)
        @this_week_date_items = @school_class.date_items.where(date: @start_of_week..@end_of_week)
        @this_week_class_leaving_times = @school_class.class_leaving_times.where(date: @start_of_week..@end_of_week)
        @this_week_morning_activities = @school_class.morning_activities.where(date: @start_of_week..@end_of_week)

    end
end