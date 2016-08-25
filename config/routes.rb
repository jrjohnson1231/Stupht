Rails.application.routes.draw do

  root to:'application#angular'

  namespace :api do
    post 'authenticate', to: 'authentication#authenticate'
    post 'register', to: 'authentication#register'
    post 'renew', to: 'authenticate#renew'
    get 'confirm', to: 'authentication#confirm'

    namespace :v1 do
      resources :users, :posts
    end
  end

  get '*path', to: 'application#angular'
  
end