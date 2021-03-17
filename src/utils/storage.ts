import { getStorageSync, setStorageSync } from '@tarojs/taro'

const TOKEN_KEY = 'user.token'

let _token: string = getStorageSync(TOKEN_KEY)

export function getToken() {
  return _token
}

export function setToken(newToken: string) {
  _token = newToken
  setStorageSync(TOKEN_KEY, newToken)
}
