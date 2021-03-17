import React, { Component } from 'react'
import { UserContext, UserState } from '@/hooks/useUser'
import { User } from './types/user'
import { getToken, setToken } from './utils'

import './styles/app.less'

class App extends Component {
  state: Pick<UserState, 'user' | 'userFetched' | 'userPromise'> = {
    user: null,
    userFetched: false,
    userPromise: new Promise(resolve => {
      this.resolveUser = resolve
    }),
  }

  componentDidMount() {
    if (getToken()) {
      // TODO 根据业务调整
      this.refreshMe().then(() => {
        this.setState({
          userFetched: true,
        })
      })
    }
  }

  // componentDidCatch() {}

  // componentDidShow() {}

  // componentDidHide() {}

  resolveUser: null | ((value: User | null) => void) = null

  setUser = (user: User | null) => {
    this.setState({
      user,
    })
  }

  refreshMe = async () => {
    // TODO 调用获取用户信息接口
    this.setUser(null)
  }

  logout = async () => {
    // TODO 调用登出接口，如果有的话
    setToken('')
    this.setUser(null)
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logged: !!this.state.user?.id,
          setUser: this.setUser,
          refreshMe: this.refreshMe,
          logout: this.logout,
        }}
      ></UserContext.Provider>
    )
  }
}

export default App
