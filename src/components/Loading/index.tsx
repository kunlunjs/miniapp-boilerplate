import React from 'react'
import { View } from '@tarojs/components'
import './index.less'

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = ({}) => {
  return <View className="loading">Loading ...</View>
}

export default Loading
