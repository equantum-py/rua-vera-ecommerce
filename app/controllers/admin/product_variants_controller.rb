module Admin
  class ProductVariantsController < ApplicationController
    before_action :set_product
    before_action :set_variant, only: %i[edit update destroy]

    def index
      @variants = @product.product_variants.order(:size, :color)
    end
    def new
      @variant = @product.product_variants.new(active: true)
    end
    def create
      @variant = @product.product_variants.new(variant_params)
      @variant.save ? redirect_to(admin_product_product_variants_path(@product), notice: "Variante creada.") : render(:new, status: :unprocessable_entity)
    end
    def edit; end
    def update
      @variant.update(variant_params) ? redirect_to(admin_product_product_variants_path(@product), notice: "Variante actualizada.") : render(:edit, status: :unprocessable_entity)
    end
    def destroy
      @variant.destroy
      redirect_to admin_product_product_variants_path(@product), notice: "Variante eliminada."
    end

    private
    def set_product; @product = Product.find(params[:product_id]); end
    def set_variant; @variant = @product.product_variants.find(params[:id]); end
    def variant_params; params.require(:product_variant).permit(:sku,:size,:color,:price,:stock,:active); end
  end
end
