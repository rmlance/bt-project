Rails.application.routes.draw do
  root 'homes#index'
  get "/dashboard", to: 'homes#index'
  get '/stocks/new', to: "homes#index"
  get "stocks/:id", to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :stocks, only: [:index, :show, :create, :destroy] do
        resources :records, only: [:create]
      end
    end
  end

  devise_for :users
end
