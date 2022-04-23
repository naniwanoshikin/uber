class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.references :restaurant, null: false, foreign_key: true
      t.string :name, null: false, comment: '商品名'
      t.integer :price, null: false, comment: '価格'
      t.text :description, null: false, comment: '説明文'

      t.timestamps
    end
  end
end
