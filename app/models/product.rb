class Product < ApplicationRecord
  belongs_to :category
  has_many :product_variants, dependent: :destroy
  validates :name, :sku, :price, presence: true
  validates :sku, uniqueness: true
  validates :price, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :stock, numericality: { greater_than_or_equal_to: 0, only_integer: true }

  def active_promotion
    Promotion.where(active: true)
      .where("starts_at IS NULL OR starts_at <= ?", Time.current)
      .where("ends_at IS NULL OR ends_at >= ?", Time.current)
      .where("category_id IS NULL OR category_id = ?", category_id)
      .order(discount_percent: :desc).first
  end

  def selling_price(base_price = price)
    promotion = active_promotion
    return base_price unless promotion
    (base_price * (100 - promotion.discount_percent) / 100.0).round
  end

  def available_stock
    variants = product_variants.where(active: true)
    variants.exists? ? variants.sum(:stock) : stock
  end
end
