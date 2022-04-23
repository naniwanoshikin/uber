import axios from 'axios';
import { restaurantsIndex } from '../urls/index'

// 親: Restaurants.jsx useEffect
export const fetchRestaurants = () => {
  // HTTPリクエストを投げる
  return axios.get(restaurantsIndex) // リクエスト先のURL文字列
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}
