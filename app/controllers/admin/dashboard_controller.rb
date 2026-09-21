module Admin
  class DashboardController < ApplicationController
    def index
      @products_count = Product.count
      @categories_count = Category.count
      @orders_count = Order.count
      @low_stock_count = Product.where(stock: 0..5).count
      @active_banners_count = Banner.where(active: true).count
      @promotions_count = Promotion.where(active: true).count
    end
  end
end
