class Order < ApplicationRecord
  belongs_to :customer, optional: true
  has_many :order_items, dependent: :destroy

  STATUSES = %w[pending confirmed preparing shipped delivered cancelled].freeze
  PAYMENT_STATUSES = %w[pending paid failed refunded].freeze

  validates :status, inclusion: { in: STATUSES }
  validates :payment_status, inclusion: { in: PAYMENT_STATUSES }
  validates :number, uniqueness: true, allow_nil: true
  validates :public_token, uniqueness: true, allow_nil: true
  before_create :assign_public_token

  private
  def assign_public_token
    self.public_token ||= SecureRandom.urlsafe_base64(32)
  end
end
