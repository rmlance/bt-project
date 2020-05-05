class StockSerializer < ActiveModel::Serializer
  attributes :created_at, :price
end
