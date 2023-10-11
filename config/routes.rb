Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get '/' => 'home#index'

  root to: "home#index"

  resources :teachers, only: [:index, :show, :new, :edit, :create, :update]
  resources :school_classes, only: [:show, :new, :create, :edit, :update, :destroy] do
    resources :lessons, only: [:new, :create, :update, :destroy]
    resources :events, only: [:create, :update, :destroy]
    resources :date_items, only: [:new, :create, :edit, :update, :destroy]
    resources :class_leaving_time, only: [:create, :update, :destroy]
    resources :morning_activities, only: [:create, :update, :destroy]
    resources :lesson_wdays, only: [:create, :update]
    resources :template_lessons, only: [:index, :create, :update, :destroy] do
      collection do
        get 'get_temp'
      end
    end
    resources :template_morning_activities, only: [:create, :update, :destroy]
    resources :template_date_items, only: [:create, :update, :destroy]
    resources :iframe, only: [:index]
  end

  resources :assigned_subjects, only: [:new, :create, :destroy]
  resources :grade_subject_units, only: [:create]

  get '/get_grade_subject_units', to: 'grade_subject_unit#get_grade_subject_units'

end
