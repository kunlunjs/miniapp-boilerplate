import { User } from '@/types/user'
import { noop } from '@/utils'
import { createContext, useContext } from 'react'

export interface UserState {
  user: User | null
  // 用户信息是否已获取
  userFetched: boolean
  // 用户信息获取中？
  userLoading: boolean
  // 是否已登录
  logged: boolean
  // 设置当前登录用户
  setUser: (state: User | null) => void
  // 登录
  login: (username: string, password: string) => Promise<void>
  // 更新我的信息
  refreshMe: () => Promise<void>
  // 登出
  logout: () => Promise<void>
}

export const UserContext = createContext<UserState>({
  user: null,
  userFetched: false,
  logged: false,
  userLoading: false,
  setUser: noop,
  login: () => Promise.resolve(),
  refreshMe: () => Promise.resolve(),
  logout: () => Promise.resolve(),
})

export function useUser() {
  return useContext(UserContext)
}
