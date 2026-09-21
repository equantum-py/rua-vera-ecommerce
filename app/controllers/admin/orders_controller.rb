module Admin
  class OrdersController < BaseController
    before_action :set_order, only: %i[show update]

    def index
      @orders = Order.order(created_at: :desc)
    end
    def show; end
    def update
      if @order.update(order_params)
        redirect_to admin_order_path(@order), notice: "Pedido actualizado."
      else
        render :show, status: :unprocessable_entity
      end
    end

    private
    def set_order
      @order = Order.find(params[:id])
    end
    def order_params
      params.require(:order).permit(:status, :payment_status, :erp_reference)
    end
  end
end
