class Api::V1::StocksController < ApplicationController

  def index
    render json: Stock.all
  end

  def show
    render json: Stock.find(params[:id])
  end

end
