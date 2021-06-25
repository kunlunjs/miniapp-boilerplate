import { View } from '@tarojs/components'
import React from 'react'
import AssetIcon from '../AssetIcon'

export default function ErrorResult() {
  return (
    <View className="t-center">
      <AssetIcon src="tip/error.svg" />
      <View className="mt-48 f-32 line-height-48" style={{ color: 'rgba(255,255,255,0.80)' }}>
        Oooops，出错了
      </View>
      <View className="mt-16 f-28 line-height-48" style={{ color: 'rgba(255,255,255,0.80)' }}>
        刷新下试试呢
      </View>
    </View>
  )
}
