class CreateRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.decimal :p, null: false, precision: 12, scale: 4
      t.string :t, null: false
      t.integer :quantity, default: 0, null: false
      t.string :format, null: false
      t.decimal :transaction_value, precision: 12, scale: 4
      t.decimal :return_value, precision: 12, scale: 4
      t.decimal :capital, precision: 12, scale: 4, null: false

      t.belongs_to :stock
    end
  end
end
