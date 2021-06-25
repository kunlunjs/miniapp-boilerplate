import type { CSSProperties } from 'react'
import React from 'react'
import { View } from '@tarojs/components'
import type { DescriptionItemProps } from './item'
import Item from './item'

export interface DescriptionsProps {
  className?: string
  items: DescriptionItemProps[]
  col?: number
  style?: CSSProperties
}

const List: React.FC<DescriptionsProps> = props => {
  const { items, className, style, col } = props
  return (
    <View className={`at-row flex-wrap space-y-24 ${className}`} style={style}>
      {items.map((item, index) => (
        <Item className={`at-col-${item.col || col}`} {...item} key={index} />
      ))}
    </View>
  )
}

List.defaultProps = {
  col: 12
}

export default List
