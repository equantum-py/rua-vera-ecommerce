class AddCheckoutFieldsToOrders < ActiveRecord::Migration[8.0]
  def change
    add_column :orders, :customer_phone, :string
    add_column :orders, :customer_document, :string
    add_column :orders, :delivery_method, :string
    add_column :orders, :delivery_address, :text
    add_column :orders, :payment_method, :string
  end
end
