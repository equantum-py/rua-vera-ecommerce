class CreateOrders < ActiveRecord::Migration[8.0]
  def change
    create_table :orders do |t|
      t.string :number
      t.string :customer_name
      t.string :customer_email
      t.string :status, null: false, default: "pending"
      t.integer :total, null: false, default: 0
      t.string :payment_status, default: "pending"
      t.string :erp_reference
      t.timestamps
    end
    add_index :orders, :number, unique: true
  end
end
