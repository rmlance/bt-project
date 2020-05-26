class RecordSerializer < ActiveModel::Serializer
  attributes :id, :p, :t, :quantity, :format, :transaction_value, :return_value, :capital
end
