class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol, null: false
      t.decimal :starting_capital, precision: 12, scale: 4, null: false

      t.timestamps null: false
      t.belongs_to :user
    end
  end
end
