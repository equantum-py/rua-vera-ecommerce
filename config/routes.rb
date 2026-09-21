Rails.application.routes.draw do
  root "storefront#home"
  get "/shop", to: "storefront#shop"
  get "/products/:id", to: "storefront#product", as: :product

  get "/cart", to: "cart#show", as: :cart
  post "/cart/items/:product_id", to: "cart#add", as: :add_to_cart
  patch "/cart/items/:item_key", to: "cart#update", as: :update_cart
  delete "/cart/items/:item_key", to: "cart#remove", as: :remove_cart

  get "/checkout", to: "checkout#show", as: :checkout
  post "/checkout", to: "checkout#create"
  get "/orders/:id/confirmation", to: "checkout#confirmation", as: :order_confirmation

  namespace :admin do
    root "dashboard#index"
    resources :products do
      resources :product_variants, except: :show
    end
    resources :categories
    resources :orders, only: %i[index show update]
    resources :inventory, only: %i[index update]
    resources :banners, except: :show
    resources :promotions, except: :show
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
