Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    namespace :v1 do
      get '/user/info', to: 'user#logged_user'

      resources :workflow
      resources :workflow_column, path: 'workflow-column'
      resources :project do
        resources :task
      end

      get '/project/:project_id/board', to: 'board#show'
      put '/project/:project_id/task/sort/columns', to: 'task#update_position'
    end
  end
end
