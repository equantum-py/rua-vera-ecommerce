class CheckoutController < ApplicationController
  before_action :load_cart

  def show
    redirect_to shop_path, alert: "Tu carrito está vacío." if @items.empty?
  end

  def create
    return redirect_to(shop_path, alert: "Tu carrito está vacío.") if @items.empty?

    order = nil
    committed = false

    Order.transaction(isolation: :serializable) do
      locked_items = @items.sort_by { |item| [item[:product].id, item[:variant]&.id.to_i] }

      locked_items.each do |item|
        item[:product].lock!
        item[:variant]&.lock!

        raise ActiveRecord::Rollback unless item[:product].active?
        raise ActiveRecord::Rollback if item[:variant] && !item[:variant].active?

        available = item[:variant] ? item[:variant].stock : item[:product].stock
        raise ActiveRecord::Rollback if item[:quantity] <= 0 || available < item[:quantity]
      end

      customer = Customer.find_or_initialize_by(email: checkout_params[:customer_email].to_s.strip.downcase)
      customer.assign_attributes(
        name: checkout_params[:customer_name],
        phone: checkout_params[:customer_phone],
        document: checkout_params[:customer_document]
      )
      customer.save!

      recalculated_items = locked_items.map do |item|
        product = item[:product]
        variant = item[:variant]
        item.merge(unit_price: product.selling_price(variant ? variant.effective_price : product.price))
      end
      total = recalculated_items.sum { |item| item[:unit_price] * item[:quantity] }

      order = Order.create!(
        customer: customer,
        number: "RUA-#{Time.current.strftime('%y%m%d')}-#{SecureRandom.hex(4).upcase}",
        customer_name: checkout_params[:customer_name],
        customer_email: checkout_params[:customer_email].to_s.strip.downcase,
        customer_phone: checkout_params[:customer_phone],
        customer_document: checkout_params[:customer_document],
        delivery_method: checkout_params[:delivery_method],
        delivery_address: checkout_params[:delivery_address],
        payment_method: checkout_params[:payment_method],
        status: "pending",
        payment_status: "pending",
        total: total
      )

      recalculated_items.each do |item|
        product = item[:product]
        variant = item[:variant]
        quantity = item[:quantity]

        order.order_items.create!(
          product: product,
          product_variant: variant,
          product_name: product.name,
          variant_name: variant&.display_name,
          sku: variant&.sku || product.sku,
          unit_price: item[:unit_price],
          quantity: quantity
        )

        variant ? variant.decrement!(:stock, quantity) : product.decrement!(:stock, quantity)
      end

      customer.update!(
        orders_count: customer.orders.count,
        total_spent: customer.orders.sum(:total)
      )
      committed = true
    end

    unless committed && order
      return redirect_to cart_path, alert: "El stock cambió mientras comprabas. Revisá tu carrito."
    end

    session[:cart] = {}
    OrderMailer.customer_confirmation(order).deliver_later
    OrderMailer.store_notification(order).deliver_later
    redirect_to order_confirmation_path(token: order.public_token)
  rescue ActiveRecord::SerializationFailure, ActiveRecord::Deadlocked
    redirect_to cart_path, alert: "Otro cliente actualizó el stock al mismo tiempo. Intentá nuevamente."
  end

  def confirmation
    @order = Order.find_by!(public_token: params[:token])
  end

  private

  def checkout_params
    params.require(:checkout).permit(
      :customer_name, :customer_email, :customer_phone, :customer_document,
      :delivery_method, :delivery_address, :payment_method
    )
  end

  def load_cart
    cart = session[:cart] || {}
    @items = cart.filter_map do |key, quantity|
      product_id, variant_id = key.to_s.split(":")
      product = Product.where(active: true).find_by(id: product_id)
      next unless product

      variant = variant_id.present? ? product.product_variants.where(active: true).find_by(id: variant_id) : nil
      next if variant_id.present? && variant.nil?

      quantity = quantity.to_i
      next if quantity <= 0

      price = product.selling_price(variant ? variant.effective_price : product.price)
      { key: key, product: product, variant: variant, quantity: quantity, unit_price: price }
    end
    @subtotal = @items.sum { |item| item[:unit_price] * item[:quantity] }
  end
end
