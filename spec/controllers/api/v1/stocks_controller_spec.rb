require 'rails_helper'

RSpec.describe Api::V1::StocksController, type: :controller do
  let! (:user) { FactoryBot.create(:user) }
  let!(:stock1) { Stock.create(symbol: "AAPL", starting_capital: 100, user_id: user.id) }
  let!(:stock2) { Stock.create(symbol: "TSLA", starting_capital: 100, user_id: user.id) }


  # happy_body = { stock: { symbol: "AAPL", starting_capital: 100, user_id: user.id } }
  # sad_body = { stock: { symbol: "AAPL", starting_capital: 100} }

  describe "GET#index" do
    it "returns a sucessful response status and a content type of json" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all restaurants in the database" do
      user = FactoryBot.create(:user)
      sign_in user

      get :index

      response_body = JSON.parse(response.body)
      # binding.pry
      expect(response_body["stocks"].length).to eq 1

      expect(response_body["stocks"][0]["symbol"]).to eq stock1.symbol
      expect(response_body["stocks"][0]["starting_capital"]).to eq stock1.starting_capital

      expect(response_body["stocks"][1]["symbol"]).to eq stock2.symbol
      expect(response_body["stocks"][1]["starting_capital"]).to eq stock2.starting_capital
    end
  end

  # describe "GET#show" do
  #   it "should return an individual restaurant with reviews" do
  #
  #     get :show, params: {id: stock1.id}
  #     returned_json = JSON.parse(response.body)
  #
  #     expect(response.status).to eq 200
  #     expect(response.content_type).to eq("application/json")
  #
  #     expect(returned_json.length).to eq 1
  #     expect(returned_json["restaurant"].length).to eq 7
  #
  #     expect(returned_json["restaurant"]["reviews"].length).to eq 1
  #     expect(returned_json["restaurant"]["reviews"][0].length).to eq 4
  #
  #     expect(returned_json["restaurant"]["name"]).to eq "Soup Co"
  #     expect(returned_json["restaurant"]["address"]).to eq "300 Walker St"
  #
  #     expect(returned_json["restaurant"]["reviews"][0]["rating"]).to eq 4
  #     expect(returned_json["restaurant"]["reviews"][0]["description"]).to eq "Waffle fries for the guys"
  #   end
  # end
  #
  # describe "POST#create" do
  #   it "creates a new restaurant" do
  #     user = FactoryBot.create(:user)
  #     sign_in user
  #     post_json = happy_body
  #
  #     prev_count = Restaurant.count
  #     post(:create, params: post_json, format: :json)
  #     expect(Restaurant.count).to eq(prev_count + 1)
  #   end
  #
  #   it "returns the json of the newly posted restaurant" do
  #     user = FactoryBot.create(:user)
  #     sign_in user
  #     post_json = happy_body
  #
  #     post(:create, params: post_json, format: :json)
  #     returned_json = JSON.parse(response.body)
  #     expect(response.status).to eq 200
  #     expect(response.content_type).to eq("application/json")
  #
  #     expect(returned_json).to be_kind_of(Hash)
  #     expect(returned_json).to_not be_kind_of(Array)
  #     expect(returned_json["restaurant"]["name"]).to eq "Top of the Hub"
  #     expect(returned_json["restaurant"]["neighborhood"]).to eq "Prudential"
  #   end
  #
  #   it "data is not persisted if form is not valid when submitted" do
  #     user = FactoryBot.create(:user)
  #     sign_in user
  #     post_json = sad_body
  #
  #     prev_count = Restaurant.count
  #     post(:create, params: post_json, format: :json)
  #     new_count = Restaurant.count
  #
  #     expect(new_count).to eq prev_count
  #   end
  #
  #   it "returns an error when required field is blank" do
  #     user = FactoryBot.create(:user)
  #     sign_in user
  #     post_json = sad_body
  #
  #     post(:create, params: post_json, format: :json)
  #     returned_json = JSON.parse(response.body)
  #
  #     expect(returned_json["error"][0]).to eq "Name can't be blank"
  #   end
  # end
  #
  # describe "PATCH#edit"
  #   it "updates an existing restaurant and does not create a new record" do
  #     happy_body = { id: stock1.id , restaurant: { name: "Top of the Hub", address: "40 Main Street", neighborhood: "Prudential", phone: "123-341-1234", url: "www.topofthehub.com" } }
  #
  #     user = FactoryBot.create(:user)
  #     sign_in user
  #     post_json = happy_body
  #
  #     prev_count = Restaurant.count
  #     patch :update, params: post_json, format: :json
  #     expect(Restaurant.count).to eq(prev_count)
  #   end
  #
  #   it "returns the json of the newly edited restaurant" do
  #     happy_body = { id: stock1.id , restaurant: { name: "Top of the Hub", address: "40 Main Street", neighborhood: "Prudential", phone: "123-341-1234", url: "www.topofthehub.com" } }
  #
  #     user = FactoryBot.create(:user)
  #     sign_in user
  #     post_json = happy_body
  #
  #     patch :update, params: post_json, format: :json
  #     returned_json = JSON.parse(response.body)
  #     expect(response.status).to eq 200
  #     expect(response.content_type).to eq("application/json")
  #
  #     expect(returned_json).to be_kind_of(Hash)
  #     expect(returned_json).to_not be_kind_of(Array)
  #     expect(returned_json["restaurant"]["name"]).to eq "Top of the Hub"
  #     expect(returned_json["restaurant"]["neighborhood"]).to eq "Prudential"
  #   end
  #
  #   it "returns an error when required field is blank" do
  #     sad_body = { id: stock1.id, restaurant: { address: "40 Main Street", neighborhood: "Prudential", phone: "123-341-1234", url: "www.topofthehub.com" } }
  #     user = FactoryBot.create(:user)
  #     sign_in user
  #     post_json = sad_body
  #
  #     post :update, params: post_json, format: :json
  #     returned_json = JSON.parse(response.body)
  #
  #     expect(returned_json["error"][0]).to eq "Name can't be blank"
  #   end
  #
  # describe "DELETE#destroy" do
  #   it "deletes a new restaurant" do
  #     restaurant = { id: stock1 }
  #     admin = FactoryBot.create(:user, role: "admin")
  #     sign_in admin
  #     delete_json = restaurant
  #
  #     prev_count = Restaurant.count
  #     delete :destroy, params: delete_json, format: :json
  #     expect(Restaurant.count).to eq(prev_count - 1)
  #     returned_json = JSON.parse(response.body)
  #
  #     expect(returned_json["notification"]).to eq "Restaurant successfully removed"
  #   end
  #
  #   it "user cannot delete a restaurant" do
  #     restaurant = { id: stock1 }
  #     user = FactoryBot.create(:user, role: "member")
  #     sign_in user
  #     delete_json = restaurant
  #
  #     prev_count = Restaurant.count
  #     delete :destroy, params: delete_json, format: :json
  #     expect(Restaurant.count).to eq(prev_count)
  #     returned_json = JSON.parse(response.body)
  #
  #     expect(returned_json["error"]).to eq "You do not have access to this action."
  #   end
  # end
end
