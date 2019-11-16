Rails.application.routes.draw do
  namespace :api do
    post 'upload', to: 'upload#create'
    get 'is_sent', to: 'upload#is_sent'
  end
end
