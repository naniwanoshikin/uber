// APIリクエストの状態

// APIの状態 reducers
export const REQUEST_STATE = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING', // ローディング中
  OK: 'OK', // 成功したアラートを出す
}

export const HTTP_STATUS_CODE = {
  NOT_ACCEPTABLE: 406,
}
