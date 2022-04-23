import axios from 'axios';
import { lineFoods, lineFoodsReplace } from '../urls/index'

// 仮注文の登録
// 親: Foods.jsx submitOrder
// 引数: {foodId: ..., count: ...}
export const postLineFoods = (params) => {
  // POST
  return axios.post(lineFoods,
    // 以下パラメーターをrailsで読み取ることができる
    {
      food_id: params.foodId, // → params[:food_id]
      count: params.count, // → params[:count]
    }
  )
    .then(res => {
      return res.data
    })
    .catch(
      // 406エラー が返ってきたらeに入る Food.jsx
      (e) => { throw e; }
    )
};

// 仮注文の置き換え
// 親: Foods.jsx replaceOrder
export const replaceLineFoods = (params) => {
  // PUT
  return axios.put(lineFoodsReplace,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
    .then(res => {
      return res.data
    })
    .catch((e) => { throw e; })
};


// 注文確定前
// 親: Orders.jsx useEffect
export const fetchLineFoods = () => {
  return axios.get(lineFoods)
    .then(res => {
      return res.data
    })
    .catch((e) => { throw e; }) // e: (Order.jsx)_catch へ
};
