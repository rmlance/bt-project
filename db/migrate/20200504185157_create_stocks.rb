class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol, null: false
      t.decimal :price, null: false, precision: 8, scale: 4

      t.timestamps null: false
    end
  end
end
