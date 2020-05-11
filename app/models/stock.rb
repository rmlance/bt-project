class Stock < ApplicationRecord
  validates :symbol, presence: true

  belongs_to :user
  has_many :records, dependent: :destroy
end
