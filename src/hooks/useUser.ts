import { User } from '@/types/user'
import { noop } from '@/utils'
import { createContext, useContext } from 'react'

export interface UserState {
  user: User | null
  userFetched: boolean
  logged: boolean
  userPromise: Promise<User | null>
  setUser: (state: User | null) => void
  refreshMe: () => Promise<void>
  logout: () => Promise<void>
}

export const UserContext = createContext<UserState>({
  user: null,
  userFetched: false,
  logged: false,
  userPromise: Promise.resolve(null),
  setUser: noop,
  refreshMe: () => Promise.resolve(),
  logout: () => Promise.resolve(),
})

export function useUser() {
  return useContext(UserContext)
}
