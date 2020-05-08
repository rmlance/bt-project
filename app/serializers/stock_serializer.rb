class StockSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :starting_capital

  has_many :records
end
