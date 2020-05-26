require 'rails_helper'

RSpec.describe Api::V1::StocksController, type: :controller do
  let! (:user) { FactoryBot.create(:user) }
  let!(:stock1) { Stock.create(symbol: "AAPL", starting_capital: 100, user_id: user.id) }
  let!(:stock2) { Stock.create(symbol: "TSLA", starting_capital: 100, user_id: user.id) }

  describe "GET#index" do
    it "returns a sucessful response status and a content type of json" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all stocks in the database" do
      sign_in user

      get :index

      response_body = JSON.parse(response.body)

      expect(response_body["stocks"].length).to eq 2

      expect(response_body["stocks"][0]["symbol"]).to eq stock1.symbol
      expect(response_body["stocks"][0]["starting_capital"]).to eq stock1.starting_capital.to_s

      expect(response_body["stocks"][1]["symbol"]).to eq stock2.symbol
      expect(response_body["stocks"][1]["starting_capital"]).to eq stock2.starting_capital.to_s
    end
  end

  describe "GET#show" do
    it "should return an individual stock with associated records" do
      sign_in user
      record1 = Record.create(p: 1200, t: 123456789, quantity: 3, format: "buy", capital: 2400, stock: stock1)
      record2 = Record.create(p: 200, t: 987654321, quantity: 2, format: "sell", capital: 400, stock: stock1)

      get :show, params: {id: stock1.id}
      response_body = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(response_body.length).to eq 1
      expect(response_body["stock"].length).to eq 4

      expect(response_body["stock"]["records"].length).to eq 2
      expect(response_body["stock"]["records"][0].length).to eq 8

      expect(response_body["stock"]["symbol"]).to eq "AAPL"
      expect(response_body["stock"]["starting_capital"]).to eq stock1.starting_capital.to_s

      expect(response_body["stock"]["records"][0]["p"]).to eq record1.p.to_s
      expect(response_body["stock"]["records"][0]["quantity"]).to eq record1.quantity
    end
  end

  describe "POST#create" do
    it "creates a new stock" do
      sign_in user
      post_json = { stock: { symbol: "AAPL", starting_capital: 100, user_id: user.id } }

      prev_count = Stock.count
      post(:create, params: post_json, format: :json)
      expect(Stock.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted stock" do
      sign_in user

      post_json = { stock: { symbol: "AAPL", starting_capital: 100, user_id: user.id } }

      post(:create, params: post_json, format: :json)
      response_body = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(response_body).to be_kind_of(Hash)
      expect(response_body).to_not be_kind_of(Array)
      expect(response_body["stock"]["symbol"]).to eq "AAPL"
      expect(response_body["stock"]["starting_capital"]).to eq "100.0"
    end

    it "data is not persisted if form is not valid when submitted" do
      sign_in user
      post_json = { stock: { symbol: "", starting_capital: 100, user_id: user.id} }

      prev_count = Stock.count
      post(:create, params: post_json, format: :json)
      new_count = Stock.count

      expect(new_count).to eq prev_count
    end

    it "returns an error when required field is blank" do
      sign_in user
      post_json = { stock: { symbol: "", starting_capital: 100} }

      post(:create, params: post_json, format: :json)
      response_body = JSON.parse(response.body)

      expect(response_body["error"][0]).to eq "Symbol can't be blank"
    end
  end

  describe "DELETE#destroy" do
    it "deletes a new stock" do
      stock = { id: stock1 }

      sign_in user
      delete_json = stock

      prev_count = Stock.count
      delete :destroy, params: delete_json, format: :json
      expect(Stock.count).to eq(prev_count - 1)
      response_body = JSON.parse(response.body)

      expect(response_body["notification"]).to eq "You are no longer tracking AAPL"
    end
  end
end
