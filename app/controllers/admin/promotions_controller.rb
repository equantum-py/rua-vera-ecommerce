module Admin
  class PromotionsController < BaseController
    before_action :set_promotion, only: %i[edit update destroy]
    def index; @promotions = Promotion.includes(:category).order(created_at: :desc); end
    def new; @promotion = Promotion.new(active: true); end
    def create
      @promotion = Promotion.new(promotion_params)
      @promotion.save ? redirect_to(admin_promotions_path, notice: "Promoción creada.") : render(:new, status: :unprocessable_entity)
    end
    def edit; end
    def update
      @promotion.update(promotion_params) ? redirect_to(admin_promotions_path, notice: "Promoción actualizada.") : render(:edit, status: :unprocessable_entity)
    end
    def destroy
      @promotion.destroy
      redirect_to admin_promotions_path, notice: "Promoción eliminada."
    end
    private
    def set_promotion; @promotion = Promotion.find(params[:id]); end
    def promotion_params; params.require(:promotion).permit(:name,:discount_percent,:category_id,:starts_at,:ends_at,:active); end
  end
end
