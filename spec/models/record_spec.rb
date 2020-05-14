require 'rails_helper'

RSpec.describe Record, type: :model do
  let! (:user) { FactoryBot.create(:user) }
  let!(:stock) { Stock.create(symbol: "AAPL", starting_capital: 100, user_id: user.id) }

  it "should allow the new user record to persist to the database if all required fields are filled correctly" do
    good_record = Record.create(p: 1200, t: 123456789, quantity: 3, format: "buy", capital: 2400, stock: stock)
    expect(good_record).to be_valid
  end

  it "should not allow data to be persisted when required field is blank" do
    bad_record = Record.create(p: 500, stock: stock)
    expect(bad_record).to_not be_valid
  end
end
