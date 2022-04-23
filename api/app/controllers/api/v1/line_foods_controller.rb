module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_food, only: %i[create replace]

      # 仮注文の一覧
      def index
        line_foods = LineFood.active # (M)
        if line_foods.exists?
          line_food_ids = []
          count = 0
          amount = 0

          line_foods.each do |line_food|
            line_food_ids << line_food.id # 仮注文id [1, 2, 4]
            count += line_food[:count] # 数量を合算
            amount += line_food.total_amount # 合計金額を合算
          end

          render json: {
            line_food_ids: line_food_ids,
            # 仮注文1つにつき店舗は1つ 仕様
            restaurant: line_foods[0].restaurant,
            count: count,
            amount: amount, # Orders.jsx
          }, status: :ok
        else
          # エラーではなく、空データを返す
          render json: {}, status: :no_content # 204
        end
      end

      # 仮注文を作成
      def create
        # @ordered_food
        # すでに他店舗での仮注文があれば
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists? # (M)
          # 処理終了
          return render json: {
            # すでに作成されている他店舗の情報
            existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            # 作成しようとした新店舗の情報
            new_restaurant: Food.find(params[:food_id]).restaurant.name,
          }, status: :not_acceptable # 406
        end

        # 仮注文を作成
        set_line_food(@ordered_food)

        # DB保存
        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error # 500
        end
      end

      # RESTから外れた例外アクション
      def replace
        # @ordered_food
        # 他店舗のactiveなLineFood一覧
        LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
          # 既にある古い仮注文を論理削除
          line_food.update_attribute(:active, false)
        end

        # 仮注文を作成
        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def set_food
        @ordered_food = Food.find(params[:food_id])
      end

      def set_line_food(ordered_food)
        # すでに同じfoodに関するline_foodが存在する場合
        if ordered_food.line_food.present?
          @line_food = ordered_food.line_food
          # 既存のものを更新
          @line_food.attributes = {
            count: ordered_food.line_food.count + params[:count],
            active: true
          }
        else
          # line_foodが存在しない場合は新規生成
          @line_food = ordered_food.build_line_food(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end
    end
  end
end
