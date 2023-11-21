class GetSessionController < ApplicationController
    def sign_in
        session[:follow_class_token] = params[:class_token]
        redirect_to user_session_path
    end
end