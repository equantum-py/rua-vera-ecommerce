module Admin
  class CategoriesController < ApplicationController
    before_action :set_category, only: %i[edit update destroy]

    def index
      @categories = Category.includes(:products).order(:name)
    end
    def new
      @category = Category.new
    end
    def create
      @category = Category.new(category_params)
      @category.slug = @category.name.to_s.parameterize if @category.slug.blank?
      if @category.save
        redirect_to admin_categories_path, notice: "Categoría creada correctamente."
      else
        render :new, status: :unprocessable_entity
      end
    end
    def edit; end
    def update
      @category.slug = category_params[:name].to_s.parameterize if category_params[:slug].blank?
      if @category.update(category_params)
        redirect_to admin_categories_path, notice: "Categoría actualizada."
      else
        render :edit, status: :unprocessable_entity
      end
    end
    def destroy
      if @category.destroy
        redirect_to admin_categories_path, notice: "Categoría eliminada."
      else
        redirect_to admin_categories_path, alert: "No se puede eliminar una categoría con productos."
      end
    end

    private
    def set_category
      @category = Category.find(params[:id])
    end
    def category_params
      params.require(:category).permit(:name, :slug, :description)
    end
  end
end
