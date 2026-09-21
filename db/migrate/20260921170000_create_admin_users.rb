class CreateAdminUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :admin_users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.integer :role, null: false, default: 2
      t.boolean :active, null: false, default: true
      t.datetime :last_sign_in_at
      t.timestamps
    end
    add_index :admin_users, :email, unique: true
  end
end
