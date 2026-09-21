class Order < ApplicationRecord
  has_many :order_items, dependent: :destroy
  validates :status, presence: true
end
