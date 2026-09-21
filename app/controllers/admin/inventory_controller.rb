module Admin
  class InventoryController < BaseController
    def index
      @products = Product.includes(:category).order(:stock, :name)
      @low_stock = @products.select { |product| product.stock <= 5 }
    end

    def update
      product = Product.find(params[:id])
      product.update!(stock: [params[:stock].to_i, 0].max)
      redirect_to admin_inventory_index_path, notice: "Stock actualizado."
    end
  end
end
