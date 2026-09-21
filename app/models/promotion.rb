class Promotion < ApplicationRecord
  validates :name, :discount_percent, presence: true
  validates :discount_percent, numericality: { greater_than: 0, less_than_or_equal_to: 100 }
  belongs_to :category, optional: true

  def active_now?
    active && (starts_at.blank? || starts_at <= Time.current) && (ends_at.blank? || ends_at >= Time.current)
  end
end
