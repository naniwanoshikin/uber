module Api
  module V1
    class OrdersController < ApplicationController
      def create
        # 複数の仮注文
        posted_line_foods = LineFood.where(id: params[:line_food_ids])
        # 本注文
        order = Order.new(
          total_price: total_price(posted_line_foods),
        )
        # 注文を登録
        if order.save_with_update_line_foods!(posted_line_foods)
          render json: {}, status: :no_content
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def total_price(posted_line_foods)
        # line_food(M)
        posted_line_foods.sum {|line_food| line_food.total_amount } + posted_line_foods.first.restaurant.fee
      end
    end
  end
end