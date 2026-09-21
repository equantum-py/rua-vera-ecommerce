module Admin
  class DashboardController < ApplicationController
    def index
      @products_count = Product.count
      @categories_count = Category.count
      @orders_count = Order.count
    end
  end
end
