import { createContext, useContext } from 'react'
import { User } from '@/types/user'
import { noop } from '@/utils'
import { ServiceArg } from '@/services'

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
  // 注册
  register: (params: ServiceArg<'微信@注册'>) => Promise<boolean>
  // 更新我的信息
  refreshMe: () => Promise<boolean>
  // 登出
  logout: () => Promise<void>
}

export const UserContext = createContext<UserState>({
  user: null,
  userFetched: false,
  logged: false,
  userLoading: false,
  setUser: noop,
  register: () => Promise.resolve(true),
  refreshMe: () => Promise.resolve(true),
  logout: () => Promise.resolve()
})

export function useUser() {
  return useContext(UserContext)
}
