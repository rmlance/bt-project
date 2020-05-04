class Stock < ApplicationRecord
  validates :symbol, :price, presence: true
end
