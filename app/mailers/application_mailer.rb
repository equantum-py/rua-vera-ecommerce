class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("MAIL_FROM", "pedidos@ruavera.com.py")
  layout "mailer"
end
