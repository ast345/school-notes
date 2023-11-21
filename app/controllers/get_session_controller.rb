class GetSessionController < ApplicationController
    def sign_in
        session[:follow_class_token] = params[:class_token]
        redirect_to user_session_path
    end

    def sign_up
        session[:follow_class_token] = params[:class_token]
        redirect_to new_user_registration_path
    end
end