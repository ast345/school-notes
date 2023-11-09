class UsingTextsController < ApplicationController
    before_action :authenticate_user!
    def index
        school_class_id = params[:school_class_id]
        @using_texts = UsingText.where(school_class_id: school_class_id)
    end
end