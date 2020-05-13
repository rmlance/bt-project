require 'rails_helper'

RSpec.describe Stock, type: :model do
  describe "stock format" do
    it "has all required fields and is valid" do
      user = FactoryBot.create(:user)
      stock = Stock.create(symbol: "AAPL", starting_capital: 100, user_id: user.id)

      expect(stock.symbol).to eq("AAPL")
      expect(stock.starting_capital).to eq(100)
      expect(stock.user_id).to eq(user.id)
    end
  end
end
