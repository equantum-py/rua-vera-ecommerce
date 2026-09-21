class Product < ApplicationRecord
  belongs_to :category
  validates :name, :sku, :price, presence: true
  validates :sku, uniqueness: true
end
