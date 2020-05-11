class Api::V1::StocksController < ApplicationController
 # skip_before_action :verify_authenticity_token
 before_action :authorize_user
 before_action :authenticate_user

  def index
    user_stocks = current_user.stocks.all
    render json: user_stocks
  end

  def show
    render json: Stock.find(params[:id])
  end

  def create
    stock = Stock.new(stock_params)
    stock.user_id = current_user.id
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
    params.require(:stock).permit(:symbol, :starting_capital)
  end

  def authenticate_user
    if !user_signed_in?
      render json: { error: "You do not have access to this page, please ensure you are signed in."}
    end
  end

  def authorize_user
    if !current_user
      render json: { error: "You do not have access to this action."}
    end
  end

end
