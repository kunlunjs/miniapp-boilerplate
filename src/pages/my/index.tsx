import React from 'react'
import { Button, View } from '@tarojs/components'
import { useUser } from '@/hooks/useUser'
import Loading from '@/components/Loading'
import './index.less'

interface MyPageProps {}

const MyPage: React.FC<MyPageProps> = () => {
  const { user, login, logged, logout, userFetched, userLoading } = useUser()

  const loginHandler = () => {
    login('username', 'password')
  }

  return !userFetched ? null : userLoading ? (
    <Loading />
  ) : !logged ? (
    <View className="p-my">
      <View className="p-my-info">未登录</View>
      <Button className="p-my-logout" type="primary" onClick={loginHandler}>
        登录
      </Button>
    </View>
  ) : (
    <View className="p-my">
      <View className="p-my-info">{user?.name}</View>
      <Button className="p-my-logout" type="primary" onClick={logout}>
        登出
      </Button>
    </View>
  )
}

export default MyPage
