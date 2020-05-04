Rails.application.routes.draw do
  root 'homes#index'
  get "/dashboard", to: 'homes#index'

  devise_for :users
end
