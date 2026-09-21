class CreateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :products do |t|
      t.references :category, null: false, foreign_key: true
      t.string :name, null: false
      t.string :sku, null: false
      t.string :brand
      t.integer :price, null: false, default: 0
      t.integer :compare_at_price
      t.integer :stock, null: false, default: 0
      t.string :image_url
      t.text :description
      t.boolean :active, null: false, default: true
      t.timestamps
    end
    add_index :products, :sku, unique: true
  end
end
