// URL
const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

// レストラン一覧
export const restaurantsIndex = `${DEFAULT_API_LOCALHOST}/restaurants` // http://localhost:3000/api/v1/restaurants という文字列になる

// フード一覧
export const foodsIndex = (restaurantId) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`

// 仮注文
export const lineFoods = `${DEFAULT_API_LOCALHOST}/line_foods`;
// 仮注文を置き換え
export const lineFoodsReplace = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;

// 本注文 Orders(C)
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;
