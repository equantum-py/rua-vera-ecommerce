class CartController < ApplicationController
  def show
    load_cart
  end

  def add
    product = Product.find(params[:product_id])
    quantity = [params[:quantity].to_i, 1].max
    cart[product.id.to_s] = cart.fetch(product.id.to_s, 0).to_i + quantity
    session[:cart] = cart
    redirect_to cart_path, notice: "#{product.name} fue agregado al carrito."
  end

  def update
    product = Product.find(params[:product_id])
    quantity = params[:quantity].to_i
    quantity <= 0 ? cart.delete(product.id.to_s) : cart[product.id.to_s] = quantity
    session[:cart] = cart
    redirect_to cart_path
  end

  def remove
    cart.delete(params[:product_id].to_s)
    session[:cart] = cart
    redirect_to cart_path
  end

  private
  def cart
    @cart ||= session[:cart] ||= {}
  end
  def load_cart
    @items = Product.where(id: cart.keys).map { |product| [product, cart[product.id.to_s].to_i] }
    @subtotal = @items.sum { |product, quantity| product.price * quantity }
  end
end
