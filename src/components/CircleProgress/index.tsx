import type { WithClassNameComponentProps } from '@/types'
import { rpxToPx } from '@/utils'
import { View } from '@tarojs/components'
import React from 'react'

interface CircleProgressProps extends WithClassNameComponentProps {
  percent: number
  radius?: number
}

const CircleProgress: React.FC<CircleProgressProps> = ({ className, percent, radius = 72 }) => {
  const r = rpxToPx(radius)
  const size = rpxToPx(radius * 2)
  return (
    <View
      className={className}
      style={{
        width: `${radius * 2}rpx`,
        height: `${radius * 2}rpx`,
        transform: 'rotate(-90deg)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg shape-rendering='geometricPrecision' viewBox='0 0 ${size} ${size}' width='${size}' height='${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle r='${r}' cx='${r}' cy='${r}' stroke='%23000' fill='none' stroke-dasharray='${
          percent * 2 * Math.PI * r
        },100000' /%3E%3C/svg%3E")`
      }}
    />
  )
}

export default CircleProgress
