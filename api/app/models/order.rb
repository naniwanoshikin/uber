class Order < ApplicationRecord
  has_many :line_foods

  validates :total_price, numericality: { greater_than: 0 }

  def save_with_update_line_foods!(line_foods) # Orders(C)
    ActiveRecord::Base.transaction do # (FE11-6)
      # LineFood: orderをnull → そのorderに
      line_foods.each do |line_food|
        line_food.update!(active: false, order: self)
      end
      self.save!
    end
  end
end
