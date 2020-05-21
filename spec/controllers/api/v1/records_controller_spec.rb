require 'rails_helper'

RSpec.describe Api::V1::RecordsController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:stock1) { Stock.create(symbol: "AAPL", starting_capital: 10000, user_id: user.id) }
  let!(:stock2) { Stock.create(symbol: "TSLA", starting_capital: 10000, user_id: user.id) }

  describe "POST#create" do
    it "creates a new record" do
      sign_in user

      post_json = {
        stock_id: stock1.id,
        record: {
          p: 100,
          t: 123456789,
          quantity: 3,
          format: "buy"
        }
      }
      prev_count = Record.count
      post(:create, params: post_json, format: :json)
      new_count = Record.count

      expect(new_count).to eq(prev_count + 1)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)

      expect(returned_json["record"]["p"]).to eq (100.0).to_s
      expect(returned_json["record"]["t"]).to eq (123456789).to_s
    end

    it "does not allow a record to be persisted if form is invalid" do
      sign_in user

      post_json = {
        stock_id: stock1.id,
        record: {
          p: 100,
          t: 123456789
        }
      }
      prev_count = Record.count
      post(:create, params: post_json, format: :json)
      new_count = Record.count

      expect(new_count).to eq prev_count
    end

    it "returns an error when required field is blank" do
      sign_in user

      post_json = {
        stock_id: stock1.id,
        record: {
          p: 100,
          t: 123456789,
          quantity: 10,
          format: "buy sell buy buy sell!! stocks!!"
        }
      }
      post(:create, params: post_json, format: :json)
      returned_json = JSON.parse(response.body)

      expect(returned_json["error"][0]).to eq "Capital can't be blank"
    end
  end
end
