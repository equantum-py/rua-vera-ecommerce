class AdminUser < ApplicationRecord
  has_secure_password
  enum :role, { order_manager: 0, catalog_manager: 1, admin: 2, super_admin: 3 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  normalizes :email, with: ->(email) { email.strip.downcase }
end
