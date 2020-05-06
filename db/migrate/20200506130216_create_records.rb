class CreateRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.decimal :p, null: false, precision: 8, scale: 4
      t.string :t, null: false

      t.belongs_to :stock
    end
  end
end
