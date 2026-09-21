class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product
  validates :product_name, :unit_price, :quantity, presence: true
end
