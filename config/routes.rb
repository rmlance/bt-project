Rails.application.routes.draw do
  root 'homes#index'
  get "/dashboard", to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :stocks, only: [:index]
    end
  end

  devise_for :users
end
