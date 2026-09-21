module Admin
  class SessionsController < ApplicationController
    def new
      redirect_to admin_root_path if current_admin_user
    end

    def create
      admin = AdminUser.find_by(email: params[:email].to_s.strip.downcase)
      if admin&.active? && admin.authenticate(params[:password])
        reset_session
        session[:admin_user_id] = admin.id
        admin.update_column(:last_sign_in_at, Time.current)
        redirect_to admin_root_path
      else
        flash.now[:alert] = "Email o contraseña incorrectos."
        render :new, status: :unprocessable_entity
      end
    end

    def destroy
      reset_session
      redirect_to admin_login_path, notice: "Sesión cerrada."
    end
  end
end
