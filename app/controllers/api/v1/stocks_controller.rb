class Api::V1::StocksController < ApplicationController
 skip_before_action :verify_authenticity_token

  def index
    render json: Stock.all
  end

  def show
    render json: Stock.find(params[:id])
  end

  def create
    stock = Stock.new(stock_params)
    if stock.save
      render json: { stock: stock }
    else
      render json: { error: stock.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    stock = Stock.find(params[:id])
    if stock.destroy
      render json: { notification: "You are no longer tracking #{stock.symbol}" }
    else
      render json: { errpr: "Unable to process this request."}
    end
  end

  protected

  def stock_params
    params.require(:stock).permit(:symbol)
  end

end
