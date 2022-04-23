class LineFood < ApplicationRecord
  belongs_to :restaurant
  belongs_to :food
  belongs_to :order, optional: true

  validates :count, numericality: { greater_than: 0 }

  # LineFood.active: trueなもの一覧を返す
  scope :active, -> { where(active: true) }
  # 他店舗のLineFood (picked_restaurant_id 以外の店舗)
  scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }

  # 合算
  def total_amount
    food.price * count
  end
end
