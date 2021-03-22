import React, { Component } from 'react'
import { UserContext, UserState } from '@/hooks/useUser'
import { getToken, setToken, sleep } from './utils'
import { User } from './types/user'

import './styles/app.less'

class App extends Component {
  state: Pick<UserState, 'user' | 'userFetched' | 'userLoading'> = {
    user: null,
    userFetched: false,
    userLoading: false,
  }

  async componentDidMount() {
    if (getToken()) {
      // TODO 根据业务调整
      await this.refreshMe()
    }
    this.setState({
      userFetched: true,
    })
  }

  // componentDidCatch() {}

  // componentDidShow() {}

  // componentDidHide() {}

  setUser = (user: User | null) => {
    this.setState({
      user,
    })
  }

  login = async (username: string, password: string) => {
    this.setState({
      userLoading: true,
    })
    // TODO 调用登录接口
    console.log(username, password)
    await sleep(1500)
    this.setUser({ id: 1, name: '用户2' })
    setToken('mock token')
    this.setState({
      userLoading: false,
    })
  }

  refreshMe = async () => {
    // TODO 调用获取用户信息接口
    this.setState({
      userLoading: true,
    })
    await sleep(1500)
    this.setUser({ id: 1, name: '用户名' })
    this.setState({
      userLoading: false,
    })
  }

  logout = async () => {
    // TODO 调用登出接口，如果有的话
    setToken('')
    this.setUser(null)
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logged: !!this.state.user?.id,
          setUser: this.setUser,
          refreshMe: this.refreshMe,
          login: this.login,
          logout: this.logout,
        }}
      >
        {/* this.props.children 是将要会渲染的页面 */}
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default App
