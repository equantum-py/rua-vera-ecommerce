class CartController < ApplicationController
  def show
    load_cart
  end

  def add
    product = Product.where(active: true).find(params[:product_id])
    variant = params[:variant_id].present? ? product.product_variants.where(active: true).find(params[:variant_id]) : nil
    if product.product_variants.where(active: true).exists? && variant.nil?
      return redirect_to product_path(product), alert: "Elegí talle y color antes de agregar al carrito."
    end
    quantity = [params[:quantity].to_i, 1].max
    available = variant ? variant.stock : product.stock
    key = cart_key(product, variant)
    desired = cart.fetch(key, 0).to_i + quantity
    return redirect_to(product_path(product), alert: "No hay stock suficiente.") if available <= 0 || desired > available

    cart[key] = desired
    session[:cart] = cart
    redirect_to cart_path, notice: "#{product.name} fue agregado al carrito."
  end

  def update
    product, variant = resolve_key(params[:item_key])
    return redirect_to(cart_path, alert: "Producto no disponible.") unless product
    quantity = params[:quantity].to_i
    available = variant ? variant.stock : product.stock
    return redirect_to(cart_path, alert: "Solo quedan #{available} unidades.") if quantity > available
    quantity <= 0 ? cart.delete(params[:item_key]) : cart[params[:item_key]] = quantity
    session[:cart] = cart
    redirect_to cart_path
  end

  def remove
    cart.delete(params[:item_key])
    session[:cart] = cart
    redirect_to cart_path
  end

  private
  def cart; @cart ||= session[:cart] ||= {}; end
  def cart_key(product, variant); variant ? "#{product.id}:#{variant.id}" : product.id.to_s; end
  def resolve_key(key)
    product_id, variant_id = key.to_s.split(":")
    product = Product.where(active: true).find_by(id: product_id)
    variant = variant_id.present? && product ? product.product_variants.where(active: true).find_by(id: variant_id) : nil
    return [nil, nil] if variant_id.present? && variant.nil?
    [product, variant]
  end
  def load_cart
    @items = cart.filter_map do |key, quantity|
      product, variant = resolve_key(key)
      next unless product
      price = product.selling_price(variant ? variant.effective_price : product.price)
      { key: key, product: product, variant: variant, quantity: quantity.to_i, unit_price: price }
    end
    @subtotal = @items.sum { |item| item[:unit_price] * item[:quantity] }
  end
end
