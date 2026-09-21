class OrderMailer < ApplicationMailer
  def customer_confirmation(order)
    @order = order
    mail(to: order.customer_email, subject: "Recibimos tu pedido #{order.number} · RUA Vera")
  end

  def store_notification(order)
    @order = order
    mail(to: ENV.fetch("STORE_ORDER_EMAIL", "pedidos@ruavera.com.py"), subject: "Nuevo pedido #{order.number} · RUA Vera")
  end
end
