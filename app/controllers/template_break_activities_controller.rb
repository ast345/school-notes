class TemplateBreakActivitiesController < ApplicationController
    before_action :authenticate_user!
    def create
        school_class = SchoolClass.find(params[:school_class_id])
        @temp_break_act = school_class.template_break_activities.build(temp_break_act_params)
        @temp_break_act.save
        render json: @temp_break_act
    end

    def update
        @temp_break_act = TemplateBreakActivity.find(params[:id])
        @temp_break_act.update(temp_break_act_params)
        render json: @temp_break_act
    end

    def destroy
        @temp_break_act = TemplateBreakActivity.find(params[:id])
        @temp_break_act.destroy!
    end

    def get_temp
        school_class = SchoolClass.find(params[:school_class_id])
        template_break_acts = school_class.template_break_activities
        start_of_week = params[:start_of_week].to_date
        end_of_week = start_of_week.end_of_week
        this_week_break_acts = school_class.break_activities.where(date: start_of_week..end_of_week)
        filtered_template_break_acts = remove_duplicate_template_break_act(template_break_acts, this_week_break_acts)
        dates = (start_of_week..end_of_week).map { |date| [date, date.wday]}
        add_dates_to_template_break_acts(filtered_template_break_acts, dates)
        render json: @break_acts_from_template
    end

    private
    def temp_break_act_params
        temp_break_act_parameters = params.require(:temp_break_act).permit(:day_of_week, :activity_name)
        temp_break_act_parameters[:activity_name] = temp_break_act_parameters[:activity_name].gsub("\n", "<br>")
        return temp_break_act_parameters
    end

    def remove_duplicate_template_break_act(template_break_acts, this_week_break_acts)
        this_week_break_act_wdays = this_week_break_acts.map { |lesson| [lesson.day_of_week] }
        template_break_acts.reject do |template_break_act|
            this_week_break_act_wdays.include?([template_break_act.day_of_week])
        end
    end

    def add_dates_to_template_break_acts(filtered_template_break_acts, dates)
        day_mapping = {
            "sunday" => 0,
            "monday" => 1,
            "tuesday" => 2,
            "wednesday" => 3,
            "thursday" => 4,
            "friday" => 5,
            "saturday" => 6
        }
        @break_acts_from_template = []
        filtered_template_break_acts.each do |template_break_act|
          matching_date = dates.find { |date| date[1] == day_mapping[template_break_act.day_of_week] }
          @break_acts_from_template << {date: matching_date[0], day_of_week: template_break_act.day_of_week, activity_name: template_break_act.activity_name}
        end
    end
end