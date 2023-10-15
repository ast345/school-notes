class TemplateClassLeavingTimesController < ApplicationController
    before_action :authenticate_user!

    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @tempClassLeavingTime = school_class.template_class_leaving_times.build(leaving_time_params)
        @tempClassLeavingTime.save
        render json: @tempClassLeavingTime
    end

    def update
        @tempClassLeavingTime = TemplateClassLeavingTime.find(params[:id])
        @tempClassLeavingTime.update(leaving_time_params)
        render json: @tempClassLeavingTime
    end

    def destroy
        @tempClassLeavingTime = TemplateClassLeavingTime.find(params[:id])
        @tempClassLeavingTime.destroy!
    end

    def get_temp
        school_class = SchoolClass.find(params[:school_class_id])
        template_leaving_times = school_class.template_class_leaving_times
        start_of_week = params[:start_of_week].to_date
        end_of_week = start_of_week.end_of_week
        this_week_leaving_times = school_class.class_leaving_times.where(date: start_of_week..end_of_week)
        filtered_template_leaving_times = remove_duplicate_template_leaving_time(template_leaving_times, this_week_leaving_times)
        dates = (start_of_week..end_of_week).map { |date| [date, date.wday]}
        add_dates_to_template_leaving_times(filtered_template_leaving_times, dates)
        render json: @leaving_times_from_template
    end

    private
    def leaving_time_params
        params.require(:temp_time).permit(:day_of_week, :leaving_time)
    end

    def remove_duplicate_template_leaving_time(template_leaving_times, this_week_leaving_times)
        this_week_leaving_time_wdays = this_week_leaving_times.map {|leaving_time| [leaving_time.day_of_week]}
        template_leaving_times.reject do |template_leaving_time|
            this_week_leaving_time_wdays.include?([template_leaving_time.day_of_week])
        end
    end

    def add_dates_to_template_leaving_times(filtered_template_leaving_times, dates)
        day_mapping = {
            "sunday" => 0,
            "monday" => 1,
            "tuesday" => 2,
            "wednesday" => 3,
            "thursday" => 4,
            "friday" => 5,
            "saturday" => 6
        }
        @leaving_times_from_template = []
        filtered_template_leaving_times.each do |template_leaving_time|
          matching_date = dates.find { |date| date[1] == day_mapping[template_leaving_time.day_of_week] }
          @leaving_times_from_template << {date: matching_date[0], day_of_week: template_leaving_time.day_of_week, leaving_time: template_leaving_time.leaving_time}
        end
    end
end