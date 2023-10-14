class TemplateMorningActivitiesController < ApplicationController
    before_action :authenticate_user!
    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @temp_morning_act = school_class.template_morning_activities.build(temp_morning_act_params)
        @temp_morning_act.save
        render json: @temp_morning_act
    end

    def update
        @temp_morning_act = TemplateMorningActivity.find(params[:id])
        @temp_morning_act.update(temp_morning_act_params)
        render json: @temp_morning_act
    end

    def destroy
        @temp_morning_act = TemplateMorningActivity.find(params[:id])
        @temp_morning_act.destroy!
    end

    def get_temp
        school_class = SchoolClass.find(params[:school_class_id])
        template_morning_acts = school_class.template_morning_activities
        start_of_week = params[:start_of_week].to_date
        end_of_week = start_of_week.end_of_week
        this_week_morning_acts = school_class.morning_activities.where(date: start_of_week..end_of_week)
        filtered_template_morning_acts = remove_duplicate_template_morning_act(template_morning_acts, this_week_morning_acts)
        dates = (start_of_week..end_of_week).map { |date| [date, date.wday]}
        add_dates_to_template_morning_acts(filtered_template_morning_acts, dates)
        render json: @morning_acts_from_template
    end
    private
    def temp_morning_act_params
        temp_morning_act_parameters = params.require(:temp_morning_act).permit(:day_of_week, :activity_name)
        temp_morning_act_parameters[:activity_name] = temp_morning_act_parameters[:activity_name].gsub("\n", "<br>")
        return temp_morning_act_parameters
    end

    def remove_duplicate_template_morning_act(template_morning_acts, this_week_morning_acts)
        this_week_morning_act_wdays = this_week_morning_acts.map { |lesson| [lesson.day_of_week] }
        template_morning_acts.reject do |template_morning_act|
            this_week_morning_act_wdays.include?([template_morning_act.day_of_week])
        end
    end

    def add_dates_to_template_morning_acts(filtered_template_morning_acts, dates)
        day_mapping = {
            "sunday" => 0,
            "monday" => 1,
            "tuesday" => 2,
            "wednesday" => 3,
            "thursday" => 4,
            "friday" => 5,
            "saturday" => 6
        }
        @morning_acts_from_template = []
        filtered_template_morning_acts.each do |template_morning_act|
          matching_date = dates.find { |date| date[1] == day_mapping[template_morning_act.day_of_week] }
          @morning_acts_from_template << {date: matching_date[0], day_of_week: template_morning_act.day_of_week, activity_name: template_morning_act.activity_name}
        end
    end
end