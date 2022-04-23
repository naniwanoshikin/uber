class CreateLineFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :line_foods do |t|
      t.references :restaurant, null: false, foreign_key: true
      t.references :food, null: false, foreign_key: true
      t.references :order, foreign_key: true, comment: '注文確定した商品...?' # 確定するまでnull
      t.integer :count, null: false, default: 0, comment: '個数'
      t.boolean :active, null: false, default: false, comment: '仮注文'

      t.timestamps
    end
  end
end
