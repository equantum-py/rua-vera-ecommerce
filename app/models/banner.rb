class Banner < ApplicationRecord
  validates :title, presence: true
  scope :active, -> { where(active: true).order(:position) }
end
