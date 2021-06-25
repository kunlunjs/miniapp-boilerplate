import { View } from '@tarojs/components'
import type { ReactNode } from 'react'
import React from 'react'
import AssetIcon from '../AssetIcon'

interface EmptyResultProps {
  description?: string
  type?: 'activity' | 'default'
  extra?: ReactNode
  dark?: boolean
}
export default function EmptyResult({
  type = 'default',
  description,
  extra,
  dark = true
}: EmptyResultProps) {
  const message = description ?? (type === 'activity' ? '您还没有预约活动哦' : '暂无数据哦')
  return (
    <View className="mt-100 t-center">
      {type === 'activity' ? (
        <AssetIcon src="tip/no-activity.svg" width="230" height="200" />
      ) : dark ? (
        <AssetIcon src="tip/no-data.svg" width="230" height="200" />
      ) : (
        <AssetIcon src="tip/no-data-light.svg" width="244" height="305" />
      )}
      <View
        className="mt-48 f-32 line-height-48"
        style={{ color: dark ? 'rgba(255,255,255,0.80)' : 't-grey' }}
      >
        {message}
      </View>
      {extra && <View>{extra}</View>}
    </View>
  )
}
