class Stock < ApplicationRecord
  validates :symbol, presence: true

  has_many :records, dependent: :destroy
end
