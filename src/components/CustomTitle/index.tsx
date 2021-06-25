import { isIOS, navigationBarHeight, statusBarHeight } from '@/utils'
import { View } from '@tarojs/components'
import { getCurrentPages, navigateBack, switchTab, useDidShow } from '@tarojs/taro'
import cn from 'classnames'
import type { CSSProperties, ReactNode } from 'react'
import React, { useState } from 'react'
import AssetIcon from '../AssetIcon'

export interface CustomTitleProps {
  title?: ReactNode
  titleClassName?: string
  showBack?: boolean
  fixed?: boolean
}

const defaultStyles: CSSProperties = {
  color: '#fff',
  height: navigationBarHeight + 'px',
  fontSize: '15px'
}

const rightStyle: CSSProperties = {
  width: '52rpx',
  height: '44rpx'
}

const CustomTitle: React.FC<CustomTitleProps> = ({ fixed, title, titleClassName }) => {
  const wraperStyles: CSSProperties = fixed
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        paddingTop: statusBarHeight + 'px',
        zIndex: 99999
      }
    : {
        paddingTop: statusBarHeight + 'px'
      }
  const [isBack, setIsBack] = useState(0)

  useDidShow(() => {
    const len = getCurrentPages().length
    const obj = getCurrentPages()[len - 1]
    if (len > 1) {
      setIsBack(1)
    } else if (!obj.getTabBar()) {
      setIsBack(2)
    }
  })

  return (
    <View className="flex px-24 ai-center" style={wraperStyles}>
      {isBack ? (
        <View
          className="py-4 px-8"
          onClick={() => {
            if (isBack === 1) {
              navigateBack()
            } else {
              switchTab({
                url: '/pages/home/index'
              })
            }
          }}
        >
          <AssetIcon
            className="no-shrink"
            src={isBack === 1 ? 'icon/back.svg' : 'nav/home.svg'}
            width="36"
            height="36"
          />
        </View>
      ) : null}
      <View
        className={cn(
          'flex ai-center flex-1 px-16',
          isIOS ? 'jc-center t-medium f-32' : 'jc-start',
          titleClassName
        )}
        style={defaultStyles}
      >
        {title}
      </View>
      <View className="no-shrink" style={rightStyle} />
    </View>
  )
}

export default CustomTitle
