module Admin
  class BaseController < ApplicationController
    before_action :require_admin!

    private
    def require_admin!
      return if current_admin_user&.active?
      session.delete(:admin_user_id)
      redirect_to admin_login_path, alert: "Iniciá sesión para acceder al administrador."
    end

    def require_super_admin!
      return if current_admin_user&.super_admin?
      redirect_to admin_root_path, alert: "No tenés permiso para realizar esta acción."
    end
  end
end
