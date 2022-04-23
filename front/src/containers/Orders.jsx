import React, { Fragment, useEffect, useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// components
import { OrderDetailItem } from "../components/OrderDetailItem";
import { OrderButton } from "../components/Buttons/OrderButton";
import CircularProgress from "@material-ui/core/CircularProgress";

// apis
import { fetchLineFoods } from "../apis/line_foods";
import { postOrder } from "../apis/orders";

// reducers
import {
  initialState,
  lineFoodsActionTypes,
  lineFoodsReducer,
} from "../reducers/lineFoods";

// images
import MainLogo from "../images/logo.png";

// constants
import { REQUEST_STATE } from "../constants";

// CSS
import { HeaderWrapper, MainLogoImage } from "../components/StyledHeader.jsx";

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;

export const Orders = () => {
  // reducer
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);

  useEffect(() => {
    // 取得中
    dispatch({ type: lineFoodsActionTypes.FETCHING });
    // API Line_foods(C)_index 注文確定前
    fetchLineFoods()
      .then((data) =>
        // console.log(data)
        dispatch({
          // 取得完了
          type: lineFoodsActionTypes.FETCH_SUCCESS,
          payload: {
            lineFoodsSummary: data,
          },
        })
      )
      .catch((e) => console.error(e)); // e: (apis/line_foods)
  }, []);

  // 注文の確定
  const postLineFoods = () => {
    // 確定中
    dispatch({ type: lineFoodsActionTypes.POSTING });
    // API Orders(C)_create
    postOrder({
      // lineFoodsSummary: line_foods(C)_index
      line_food_ids: state.lineFoodsSummary.line_food_ids,
    }).then(() => {
      // 確定完了
      dispatch({ type: lineFoodsActionTypes.POST_SUCCESS });
      window.location.reload(); // 画面をリロード
    });
  };

  // リクエストの状態に応じた注文ボタンの文言
  const orderButtonLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return "注文中...";
      case REQUEST_STATE.OK:
        return "注文が完了しました！";
      default:
        return "注文を確定する";
    }
  };

  // APIから取得 + state.lineFoodsSummaryがある
  const isExistsLineFoodsSummary = () =>
    state.fetchState === REQUEST_STATE.OK && state.lineFoodsSummary;
  // APIから取得 + 仮注文データがなくなったら
  const isDeletedLineFoodsSummary = () =>
    state.fetchState === REQUEST_STATE.OK && !state.lineFoodsSummary;

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
        <div>
          <OrderItemWrapper>
            {
              // APIローディング中は
              state.fetchState === REQUEST_STATE.LOADING ? (
                // くるくる回るローディング
                <CircularProgress />
              ) : (
                state.lineFoodsSummary && (
                  // 注文確定前画面
                  <OrderDetailItem
                    restaurantId={state.lineFoodsSummary.restaurant.id}
                    restaurantName={state.lineFoodsSummary.restaurant.name}
                    restaurantFee={state.lineFoodsSummary.restaurant.fee}
                    timeRequired={
                      state.lineFoodsSummary.restaurant.time_required
                    }
                    foodCount={state.lineFoodsSummary.count}
                    // amount: 合計金額 Line_foods(C)
                    price={state.lineFoodsSummary.amount}
                  />
                )
              )
            }
          </OrderItemWrapper>

          <div>
            {isExistsLineFoodsSummary() && (
              // [注文を確定する]ボタン
              <OrderButton
                onClick={() => postLineFoods()}
                disabled={
                  state.postState === REQUEST_STATE.LOADING ||
                  state.postState === REQUEST_STATE.OK
                }
              >
                {orderButtonLabel()}
              </OrderButton>
            )}
            {isDeletedLineFoodsSummary() && <p>注文予定の商品はありません。</p>}
          </div>
        </div>
      </OrderListWrapper>
    </Fragment>
  );
};
