class CheckoutController < ApplicationController
  before_action :load_cart

  def show
    redirect_to shop_path, alert: "Tu carrito está vacío." if @items.empty?
  end

  def create
    return redirect_to(shop_path, alert: "Tu carrito está vacío.") if @items.empty?

    Order.transaction do
      @items.each do |item|
        item[:variant]&.lock!
        item[:product].lock! unless item[:variant]
        available = item[:variant] ? item[:variant].stock : item[:product].stock
        raise ActiveRecord::Rollback if available < item[:quantity]
      end

      order = Order.create!(
        number: "RUA-#{Time.current.strftime('%y%m%d')}-#{SecureRandom.hex(2).upcase}",
        customer_name: checkout_params[:customer_name], customer_email: checkout_params[:customer_email],
        customer_phone: checkout_params[:customer_phone], customer_document: checkout_params[:customer_document],
        delivery_method: checkout_params[:delivery_method], delivery_address: checkout_params[:delivery_address],
        payment_method: checkout_params[:payment_method], status: "pending", payment_status: "pending", total: @subtotal
      )
      @items.each do |item|
        product = item[:product]; variant = item[:variant]; quantity = item[:quantity]
        order.order_items.create!(product: product, product_variant: variant, product_name: product.name,
          variant_name: variant&.display_name, sku: variant&.sku || product.sku, unit_price: item[:unit_price], quantity: quantity)
        variant ? variant.decrement!(:stock, quantity) : product.decrement!(:stock, quantity)
      end
      session[:cart] = {}
      return redirect_to order_confirmation_path(order)
    end
    redirect_to cart_path, alert: "El stock cambió mientras comprabas. Revisá tu carrito."
  end

  def confirmation
    @order = Order.find(params[:id])
  end

  private
  def checkout_params
    params.require(:checkout).permit(:customer_name,:customer_email,:customer_phone,:customer_document,:delivery_method,:delivery_address,:payment_method)
  end
  def load_cart
    cart = session[:cart] || {}
    @items = cart.filter_map do |key, quantity|
      product_id, variant_id = key.to_s.split(":")
      product = Product.find_by(id: product_id)
      next unless product
      variant = variant_id.present? ? product.product_variants.find_by(id: variant_id) : nil
      price = product.selling_price(variant ? variant.effective_price : product.price)
      { key: key, product: product, variant: variant, quantity: quantity.to_i, unit_price: price }
    end
    @subtotal = @items.sum { |item| item[:unit_price] * item[:quantity] }
  end
end
