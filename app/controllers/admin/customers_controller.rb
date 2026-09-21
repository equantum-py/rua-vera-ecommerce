module Admin
  class CustomersController < BaseController
    def index
      @customers = Customer.order(total_spent: :desc)
    end
    def show
      @customer = Customer.find(params[:id])
      @orders = @customer.orders.order(created_at: :desc)
    end
  end
end
