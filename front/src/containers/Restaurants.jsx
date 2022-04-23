import React, { Fragment, useReducer, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// ローダーUI
import Skeleton from "@material-ui/lab/Skeleton";

// apis
import { fetchRestaurants } from "../apis/restaurants";

// reducers
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from "../reducers/restaurants";

// constants APIの状態
import { REQUEST_STATE } from "../constants";

// images
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";
import RestaurantImage from "../images/restaurant-image.jpg";

// CSS
import { HeaderWrapper, MainLogoImage } from "../components/StyledHeader.jsx";

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;
const MainCover = styled.img`
  height: 600px;
`;

// レストランリスト
const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;
const MainText = styled.p`
  color: black;
  font-size: 18px;
`;
const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

export const Restaurants = () => {
  // reducer
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    // 取得中
    dispatch({ type: restaurantsActionTypes.FETCHING });
    // → state中のfetchStateがREQUEST_STATE.LOADINGに変更
    // API Restaurants(C)_index
    fetchRestaurants().then((data) =>
      // console.log(data)
      dispatch({
        // 取得完了
        type: restaurantsActionTypes.FETCH_SUCCESS,
        payload: {
          restaurants: data.restaurants,
        },
      })
    );
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      {/* レストラン一覧: 三項演算子 */}
      <RestaurantsContentsList>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            <Skeleton variant="rect" width={450} height={300} />
            <Skeleton variant="rect" width={450} height={300} />
            <Skeleton variant="rect" width={450} height={300} />
          </Fragment>
        ) : (
          state.restaurantsList.map((item, index) => (
            <Link
              to={`/restaurants/${item.id}/foods`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantImage} />
                <MainText>{item.name}</MainText>
                <SubText>{`配送料：${item.fee}円 ${item.time_required}分`}</SubText>
              </RestaurantsContentWrapper>
            </Link>
          ))
        )}
      </RestaurantsContentsList>
    </Fragment>
  );
};
