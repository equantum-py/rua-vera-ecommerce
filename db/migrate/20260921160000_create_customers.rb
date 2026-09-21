class CreateCustomers < ActiveRecord::Migration[8.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :email, null: false
      t.string :phone
      t.string :document
      t.integer :orders_count, null: false, default: 0
      t.integer :total_spent, null: false, default: 0
      t.timestamps
    end
    add_index :customers, :email, unique: true
    add_reference :orders, :customer, foreign_key: true
  end
end
