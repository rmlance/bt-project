class ApplicationRecord < ApplicationRecord
  validates :symbol, :price, presence: true
end
