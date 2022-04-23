import { REQUEST_STATE } from '../constants';

export const initialState = {
  // GET APIの状態
  fetchState: REQUEST_STATE.INITIAL,
  // APIから取得したレストラン一覧
  restaurantsList: [],
};

export const restaurantsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    case restaurantsActionTypes.FETCHING:
      return {
        ...state, // [] が入る
        fetchState: REQUEST_STATE.LOADING, // 取得中
      };
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK, // 取得完了
        restaurantsList: action.payload.restaurants, // 取得データ
      };
    default:
      throw new Error();
  }
}
