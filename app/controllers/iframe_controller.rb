class IframeController < ApplicationController
    after_action :allow_iframe
    def index
        @show_header = false
        @school_class = SchoolClass.find(params[:school_class_id])

        @start_of_week = Date.today.beginning_of_week
        pramas_exist =false
        if params[:start_of_week]
            @start_of_week = params[:start_of_week].to_date
            params_exist = true
        end


        next_week_permission(@start_of_week, params_exist)
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
        @this_week_morning_activities = @school_class.morning_activities.where(date: @start_of_week..@end_of_week)

    end

    private
    def allow_iframe
        response.headers['X-Frame-Options'] = 'ALLOWALL'
    end

    def next_week_permission(start_of_week, params_exist)
        today = Date.today + 1
        current_time = Time.now
        wday_of_today = today.wday
        days_until_friday = if today.saturday?
                                -1
                            elsif today.sunday?
                                -2
                            else
                                (5 - today.wday + 7) % 7
                            end
        this_friday = today + days_until_friday
        switch_time = Time.new(this_friday.year, this_friday.month, this_friday.day, 18, 0, 0)
        days_difference = (this_friday - start_of_week).to_i

        if wday_of_today >= 1 && wday_of_today <= 4
            if days_difference == 4
                @next_week_perm = false
            else
                @next_week_perm = true
            end
        elsif wday_of_today == 5 && current_time < switch_time
            if days_difference == 4
                @next_week_perm = false
            else
                @next_week_perm = true
            end
        else
            if params_exist
                if days_difference < 0
                    @next_week_perm = false
                else
                    @next_week_perm = true
                end
            else
                @next_week_perm = false
                @start_of_week = start_of_week + 7
            end
        end
    end
end