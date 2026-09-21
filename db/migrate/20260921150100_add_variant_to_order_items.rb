class AddVariantToOrderItems < ActiveRecord::Migration[8.0]
  def change
    add_reference :order_items, :product_variant, foreign_key: true
    add_column :order_items, :variant_name, :string
  end
end
