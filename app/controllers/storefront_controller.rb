class StorefrontController < ApplicationController
  def home
    @categories = Category.includes(:products).all
    @featured_products = Product.where(active: true).order(created_at: :desc).limit(16)
    @banners = Banner.active
  end

  def shop
    @categories = Category.all
    @products = Product.where(active: true)
    @products = @products.joins(:category).where(categories: { name: params[:category] }) if params[:category].present?
  end

  def product
    @product = Product.find(params[:id])
  end
end
