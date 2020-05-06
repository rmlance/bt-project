class StockSerializer < ActiveModel::Serializer
  attributes :id, :symbol

  has_many :records
end
