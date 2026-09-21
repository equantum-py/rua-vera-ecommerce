module Admin
  class BannersController < ApplicationController
    before_action :set_banner, only: %i[edit update destroy]
    def index; @banners = Banner.order(:position); end
    def new; @banner = Banner.new(active: true); end
    def create
      @banner = Banner.new(banner_params)
      @banner.save ? redirect_to(admin_banners_path, notice: "Banner creado.") : render(:new, status: :unprocessable_entity)
    end
    def edit; end
    def update
      @banner.update(banner_params) ? redirect_to(admin_banners_path, notice: "Banner actualizado.") : render(:edit, status: :unprocessable_entity)
    end
    def destroy
      @banner.destroy
      redirect_to admin_banners_path, notice: "Banner eliminado."
    end
    private
    def set_banner; @banner = Banner.find(params[:id]); end
    def banner_params; params.require(:banner).permit(:title,:subtitle,:image_url,:link_url,:button_text,:position,:active); end
  end
end
