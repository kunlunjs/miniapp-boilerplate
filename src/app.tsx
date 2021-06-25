import { UserContext, UserState } from '@/hooks/useUser'
import { clearStorage, login } from '@tarojs/taro'
import React, { Component } from 'react'
import services from './services'
import { ServiceRequestAndResponseMap } from './services/yapi.api'
import './styles/app.less'
import './styles/taro.scss'
import { User } from './types/user'
import { getToken, setToken } from './utils'

class App extends Component {
  state: Pick<UserState, 'user' | 'userFetched' | 'userLoading'> = {
    user: null,
    userFetched: false,
    userLoading: false
  }

  async componentDidMount() {
    if (getToken()) {
      await this.refreshMe()
    } else {
      const res = await login()
      // TODO 调用预登录
      const { error, data } = await services['微信@预登录']({
        code: res.code
      })
      if (!error) {
        // 该用户已注册过
        if (data?.user_info) {
          setToken(data.user_info.token)
          await this.refreshMe()
        } else {
          this.setUser({
            openID: data!.openid
          })
        }
      }
    }
    this.setState({
      userFetched: true
    })
  }

  setUser = (user: User | null) => {
    this.setState({
      user
    })
  }

  register = async (params: ServiceRequestAndResponseMap['微信@注册']['body']) => {
    this.setState({
      userLoading: true
    })
    // TODO 调用注册接口
    const { error, data } = await services['微信@注册'](params)
    if (!error) {
      setToken(data!.token)
      if (await this.refreshMe()) {
        this.setState({
          userLoading: false
        })
        return true
      }
    }
    return false
  }

  refreshMe = async () => {
    // TODO 调用获取用户信息接口
    this.setState({
      userLoading: true
    })
    const { error, data } = await services['用户@用户信息']()
    if (!error) {
      this.setUser(data as unknown as User)
    }
    this.setState({
      userLoading: false
    })
    return !error
  }

  logout = async () => {
    // TODO 调用登出接口，如果有的话
    clearStorage()
    setToken('')
    this.setUser(null)
    // reLaunch({
    //   url: '/pages/my/index'
    // })
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logged: !!this.state.user?.id,
          setUser: this.setUser,
          refreshMe: this.refreshMe,
          register: this.register,
          logout: this.logout
        }}
      >
        {/* this.props.children 是将要会渲染的页面 */}
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default App
