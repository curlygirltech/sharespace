Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify' 
  get '/bookings/user', to: 'bookings#user_bookings'
  resources :bookings 
  resources :homes 
  resources :users, only: [:show, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
end
