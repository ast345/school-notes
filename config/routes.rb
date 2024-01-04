Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" , registrations: "users/registrations"}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get '/' => 'home#index'
  # devise_for :users, :controllers => {
  #   :registrations => 'users/registrations'
  #  }
  root to: "home#index"

  resources :teachers, only: [:update]
  resources :school_classes, only: [:show, :new, :create, :edit, :update, :destroy] do
    resources :lessons, only: [:new, :create, :update, :destroy]
    resources :events, only: [:create, :update, :destroy]
    resources :date_items, only: [:new, :create, :edit, :update, :destroy]
    resources :class_leaving_time, only: [:create, :update, :destroy]
    resources :morning_activities, only: [:create, :update, :destroy]
    resources :break_activities, only: [:create, :update, :destroy]
    resources :lesson_wdays, only: [:create, :update]
    resources :lesson_periods, only: [:create, :update]
    resources :break_act_displays, only: [:create, :update]
    resources :grade_subject_units, only: [:index]
    resources :using_texts, only: [:index]
    resources :text_books, only: [:show]
    resources :template_lessons, only: [:index, :create, :update, :destroy] do
      collection do
        get 'get_temp'
      end
    end
    resources :template_morning_activities, only: [:create, :update, :destroy] do
      collection do
        get 'get_temp'
       end
    end
    resources :template_date_items, only: [:create, :update, :destroy] do
      collection do
        get 'get_temp'
      end
    end
    resources :template_class_leaving_times, only: [:create, :update, :destroy] do
      collection do
        get 'get_temp'
      end
    end
  end

resources :school_class_teachers, only: [:create, :destroy]

  get 'school_classes/:token/share', to: 'share#index', as: 'school_class_share_index'
  get 'school_classes/:token/share_teachers', to:'share_teachers#index', as: 'school_class_share_teacher'

  resources :assigned_subjects, only: [:new, :create, :destroy]
  resources :grade_subject_units, only: [:create, :update, :destroy]
  resources :opinions, only: [:index]
  resources :grade_subject, only: [:index]

  get '/get_grade_subject_units', to: 'grade_subject_unit#get_grade_subject_units'
  get '/new_user_session_with_follow', to: 'get_session#sign_in'
  get '/new_user_registration_with_follow', to: 'get_session#sign_up'

end
