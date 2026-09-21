class CheckoutController < ApplicationController
  before_action :load_cart

  def show
    redirect_to shop_path, alert: "Tu carrito está vacío." if @items.empty?
  end

  def create
    return redirect_to(shop_path, alert: "Tu carrito está vacío.") if @items.empty?

    order = Order.create!(
      number: "RUA-#{Time.current.strftime('%y%m%d')}-#{SecureRandom.hex(2).upcase}",
      customer_name: checkout_params[:customer_name],
      customer_email: checkout_params[:customer_email],
      customer_phone: checkout_params[:customer_phone],
      customer_document: checkout_params[:customer_document],
      delivery_method: checkout_params[:delivery_method],
      delivery_address: checkout_params[:delivery_address],
      payment_method: checkout_params[:payment_method],
      status: "pending",
      payment_status: "pending",
      total: @subtotal
    )
    @items.each do |product, quantity|
      order.order_items.create!(product: product, product_name: product.name, sku: product.sku, unit_price: product.price, quantity: quantity)
    end
    session[:cart] = {}
    redirect_to order_confirmation_path(order)
  end

  def confirmation
    @order = Order.find(params[:id])
  end

  private
  def checkout_params
    params.require(:checkout).permit(:customer_name, :customer_email, :customer_phone, :customer_document, :delivery_method, :delivery_address, :payment_method)
  end
  def load_cart
    cart = session[:cart] || {}
    @items = Product.where(id: cart.keys).map { |product| [product, cart[product.id.to_s].to_i] }
    @subtotal = @items.sum { |product, quantity| product.price * quantity }
  end
end
