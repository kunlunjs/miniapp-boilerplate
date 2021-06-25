import { Text, View } from '@tarojs/components'
import type { ReactNode } from 'react'
import React from 'react'
import './item.less'

export interface DescriptionItemProps {
  className?: string
  width?: string | null
  title: string
  value: ReactNode
  col?: number
}

export const DescriptionItem: React.FC<DescriptionItemProps> = props => {
  const { title, value, width, className } = props
  const labelWidth = width === null ? undefined : width
  return (
    <View className={`t-normal f-32 line-height-45 flex ${className}`}>
      <Text className="no-shrink" style={{ display: 'inline-block', width: labelWidth }}>
        {title}
      </Text>
      <Text className="t-normal t-default">{value}</Text>
    </View>
  )
}

DescriptionItem.defaultProps = {
  width: '5em'
}

export default DescriptionItem
