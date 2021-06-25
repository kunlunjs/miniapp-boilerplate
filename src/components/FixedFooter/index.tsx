import { navigationBarHeight } from '@/utils'
import { View } from '@tarojs/components'
import cn from 'classnames'
import type { CSSProperties, ReactNode } from 'react'
import React from 'react'
import './index.less'

interface FixedFooterProps {
  isCustomTitle?: boolean
  className?: string
  footer: ReactNode
  footerClass?: string
  footerHeight?: string | number
  transparent?: boolean
}

const FixedFooter: React.FC<FixedFooterProps> = ({
  isCustomTitle,
  footer,
  children,
  className,
  footerClass,
  footerHeight = '100',
  transparent = false
}) => {
  const wrapHeight = isCustomTitle ? `100vh - ${navigationBarHeight}px` : '100vh'

  const style: CSSProperties = {
    minHeight: `${footerHeight}rpx`
  }
  if (transparent) {
    style.background = 'none'
  }

  return (
    <View
      className={cn('fixed-footer-wrap', className)}
      style={{ minHeight: wrapHeight, paddingBottom: `${footerHeight}rpx` }}
    >
      {children}
      <View className={cn('fixed-footer', footerClass)} style={style}>
        {footer}
      </View>
    </View>
  )
}

export default FixedFooter
