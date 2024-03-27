Rails.application.routes.draw do
  resources :message_views
  resources :comments
resources :items do
  get :search, on: :collection
  get :filter, on: :collection
   get :index, constraints: { distance: /\d+/ }
end
  resources :direct_messages
  resources :friendship_connections
  resources :users



  # Defines the root path route ("/")
  # root "posts#index"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get '/me', to: "sessions#show"
  post "/signup", to: "users#create"
  delete "/cancel", to: "users#destroy"

    get "up" => "rails/health#show", as: :rails_health_check
  get '/inbox/direct_messages', to: 'inbox#direct_messages'
  patch '/update_is_message_viewed', to: 'messages#update_is_viewed'

end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.