Rails.application.routes.draw do
  root "storefront#home"
  get "/shop", to: "storefront#shop"
  get "/products/:id", to: "storefront#product", as: :product

  namespace :admin do
    root "dashboard#index"
    resources :products
    resources :categories
    resources :orders, only: %i[index show update]
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
