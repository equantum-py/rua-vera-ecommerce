class ProductVariant < ApplicationRecord
  belongs_to :product
  validates :sku, presence: true, uniqueness: true
  validates :stock, numericality: { greater_than_or_equal_to: 0 }
  validates :price, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  def display_name
    [size, color].compact_blank.join(" · ").presence || sku
  end

  def effective_price
    price.presence || product.price
  end
end
