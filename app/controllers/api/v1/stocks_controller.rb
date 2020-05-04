class Api::V1::StocksController < ApplicationController

  def index
    render json: Stock.all
  end


end
