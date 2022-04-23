import axios from 'axios';
import { orders } from '../urls/index'

// 注文の登録
// 親: Orders.jsx postLineFoods
// 引数: {line_food_ids: ...}
export const postOrder = (params) => {
  return axios.post(orders,
    {
      // １つの店舗で登録された"1つ以上の"仮注文のデータをまとめて注文データに紐づける
      line_food_ids: params.line_food_ids // [1,2,3]
    },
  )
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}
