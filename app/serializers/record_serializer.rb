class RecordSerializer < ActiveModel::Serializer
  attributes :p, :t, :quantity, :transaction_value, :return_value, :capital
end
