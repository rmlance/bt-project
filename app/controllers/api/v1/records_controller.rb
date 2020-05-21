class Api::V1::RecordsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    stock = Stock.find(params[:stock_id])
    current_record = Record.new(record_params)
    newguy = TradeLogic.new(stock, current_record).build_record
    if current_record.save
      render json: current_record
    else
      render json: { error: current_record.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def record_params
    params.require(:record).permit(:p, :t, :quantity, :format)
  end
end
