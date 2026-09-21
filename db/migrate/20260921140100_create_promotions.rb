class CreatePromotions < ActiveRecord::Migration[8.0]
  def change
    create_table :promotions do |t|
      t.string :name, null: false
      t.integer :discount_percent, null: false
      t.references :category, foreign_key: true
      t.datetime :starts_at
      t.datetime :ends_at
      t.boolean :active, null: false, default: true
      t.timestamps
    end
  end
end
