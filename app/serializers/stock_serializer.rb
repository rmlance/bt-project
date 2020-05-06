class StockSerializer < ActiveModel::Serializer
  attributes :symbol

  has_many :records
end
