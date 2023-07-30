Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get '/' => 'home#index'

  root to: "home#index"

  resources :teachers, only: [:index, :show, :new, :edit, :create, :update]
  resources :school_classes, only: [:new, :create]
  resources :assigned_subjects, only: [:new, :create]
  
end
