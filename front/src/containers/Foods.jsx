import React, { Fragment, useReducer, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";

// components
// ヘッダーアイコン
import { LocalMallIcon } from "../components/Icons";
// フード一つずつのitem
import { FoodWrapper } from "../components/FoodWrapper";
// 例外時のモーダル
import { NewOrderConfirmDialog } from "../components/NewOrderConfirmDialog";
// モーダル画面
import { FoodOrderDialog } from "../components/FoodOrderDialog";
// ローダーUI
import Skeleton from "@material-ui/lab/Skeleton";

// reducers
import {
  initialState as foodsInitialState, // useStateと名前被らないよう
  foodsActionTypes,
  foodsReducer,
} from "../reducers/foods";

// apis
import { fetchFoods } from "../apis/foods";
import { postLineFoods, replaceLineFoods } from "../apis/line_foods";

// constants
import { COLORS } from "../style_constants";
import { REQUEST_STATE } from "../constants";
import { HTTP_STATUS_CODE } from "../constants";

// 画像
import MainLogo from "../images/logo.png"; // Tech Eats
import FoodImage from "../images/food-image.jpg";

// CSS
import { HeaderWrapper, MainLogoImage } from "../components/StyledHeader.jsx";

// バッグ全体
const BagIconWrapper = styled.div`
  padding-top: 24px;
`;
// バッグの色
const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

// 親: App.js 引数: Request URL
export const Foods = ({ match }) => {
  const history = useHistory();

  // 第一引数: useStateと名前被らないよう
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  // useState モーダル
  const initialState = {
    selectedFood: null, // foodとして子へ
    selectedFoodCount: 1, // 数量 = 仕様
    isOpenOrderDialog: false, // 仮注文モーダル: なし
    isOpenNewOrderDialog: false, // 新規注文モーダル: なし
    existingRestaurautName: "", // 元々入っていた店舗名
    newRestaurautName: "", // 新しく入った店舗名
  };
  const [state, setState] = useState(initialState);

  // フード一覧画面の表示
  useEffect(() => {
    // 取得中
    dispatch({ type: foodsActionTypes.FETCHING });
    // API Foods(C)_index
    fetchFoods(match.params.restaurantsId)
      .then((data) => {
        dispatch({
          // 取得完了
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: {
            foods: data.foods,
          },
        });
        // console.log(data)
      });
  }, []);

  // 仮注文の登録
  const submitOrder = () => {
    // console.log("登録ボタンが押された");
    // API Line_foods(C)_create
    postLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    })
      // リクエスト成功: 注文画面へ遷移 Orders.jsxをレンダリング
      .then(() => history.push("/orders"))
      // リクエスト失敗:
      .catch((e) => {
        // レスポンスチェック: 406エラー(railsで定義)か?
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setState({
            ...state,
            isOpenOrderDialog: false, // 仮注文モーダルを閉じる
            isOpenNewOrderDialog: true, // 新規注文モーダルを表示
            // 必要な情報をeオブジェクトから取得
            existingRestaurautName: e.response.data.existing_restaurant,
            newRestaurautName: e.response.data.new_restaurant,
          });
        } else {
          throw e;
        }
      });
  };

  // 仮注文を置き換え in 新規注文モーダル
  const replaceOrder = () => {
    // API Line_foods(C)_replace
    replaceLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    }).then(() => history.push("/orders"));
  };

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>

      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            {/* 12個のSkeleton */}
            {[...Array(12).keys()].map((i) => (
              <ItemWrapper key={i}>
                <Skeleton key={i} variant="rect" width={450} height={180} />
              </ItemWrapper>
            ))}
          </Fragment>
        ) : (
          foodsState.foodsList.map((food) => (
            <ItemWrapper key={food.id}>
              {/* item */}
              <FoodWrapper
                food={food}
                onClickFoodWrapper={(food) =>
                  setState({
                    ...state,
                    isOpenOrderDialog: true, // モーダル画面
                    selectedFood: food,
                  })
                }
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
      {/* モーダル画面 をレンダリング */}
      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          food={state.selectedFood} // 選択したフード
          countNumber={state.selectedFoodCount} // 数量
          isOpen={state.isOpenOrderDialog}
          onClickCountUp={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1,
            })
          }
          onClickCountDown={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1,
            })
          }
          onClickOrder={() => submitOrder()}
          // モーダルを閉じた時
          onClose={() =>
            // すべてのstateを初期化
            setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
              selectedFoodCount: 1,
            })
          }
        />
      )}
      {/* 新規注文モーダル */}
      {state.isOpenNewOrderDialog && (
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          onClose={() =>
            setState({
              ...state,
              isOpenNewOrderDialog: false,
            })
          }
          existingRestaurautName={state.existingRestaurautName}
          newRestaurautName={state.newRestaurautName}
          onClickSubmit={() => replaceOrder()}
        />
      )}
    </Fragment>
  );
};
