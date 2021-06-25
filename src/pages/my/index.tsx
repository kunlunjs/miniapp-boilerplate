import Loading from '@/components/Loading'
import { useUser } from '@/hooks/useUser'
import { Button, View } from '@tarojs/components'
import React from 'react'
import './index.less'

const MyPage: React.FC = () => {
  const { user, register, logged, logout, userFetched, userLoading } = useUser()

  const loginHandler = () => {
    register('username')
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
