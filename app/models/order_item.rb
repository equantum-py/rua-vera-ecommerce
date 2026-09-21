class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product
  belongs_to :product_variant, optional: true

  validates :product_name, :sku, presence: true
  validates :unit_price, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :quantity, numericality: { greater_than: 0, only_integer: true }
end
