class Customer < ApplicationRecord
  has_many :orders, dependent: :restrict_with_error
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  normalizes :email, with: ->(email) { email.strip.downcase }

  def masked_document
    return "—" if document.blank?
    value = document.to_s
    return "*" * value.length if value.length <= 4
    "#{'*' * (value.length - 4)}#{value.last(4)}"
  end

  def masked_phone
    return "—" if phone.blank?
    value = phone.to_s
    return "*" * value.length if value.length <= 4
    "#{'*' * (value.length - 4)}#{value.last(4)}"
  end

  def masked_email
    return "—" if email.blank?
    local, domain = email.split("@", 2)
    return "***" unless domain
    "#{local.first}***@#{domain}"
  end
end
