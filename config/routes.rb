Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get '/' => 'home#index'

  root to: "home#index"

  resources :teachers, only: [:index, :show, :new, :edit, :create, :update]
  resources :school_classes, only: [:show, :new, :create, :edit, :update, :destroy] do
    resources :lessons, only: [:new, :create, :edit, :update, :destroy]
    resources :events, only: [:new, :create, :edit, :update, :destroy]
    resources :date_items, only: [:new, :create, :edit, :update, :destroy]
  end

  resources :assigned_subjects, only: [:new, :create, :destroy]

  get '/get_grade_subject_units', to: 'grade_subject_unit#get_grade_subject_units'

end
