class Record < ApplicationRecord
  validates :p, :t, :quantity, :format, :capital, presence: true

  belongs_to :stock
end
