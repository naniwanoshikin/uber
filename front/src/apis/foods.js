import axios from 'axios';
import { foodsIndex } from '../urls/index'

// 親: Foods.jsx useEffect
// 引数: url
export const fetchFoods = (restaurantId) => {

  return axios.get(foodsIndex(restaurantId))
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}
