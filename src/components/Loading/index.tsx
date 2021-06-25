import type { WithClassNameComponentProps } from '@/types'
import { View } from '@tarojs/components'
import cn from 'classnames'
import React from 'react'
import styles from './index.module.less'

export interface LoadingProps extends WithClassNameComponentProps {
  dark?: boolean
  text?: string
}

const Loading: React.FC<LoadingProps> = ({ dark = true, className, text = '加载中' }) => {
  return (
    <View className={cn('flex-column ai-center jc-center py-24', className)}>
      <View
        className={styles.icon}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg height='38' viewBox='0 0 38 38' width='38' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 36.39l3.9-25.897 13.36-6.718 7.468 10.066L37.306 3l-3.659 24.526-13.302 7.5-8.415-9.92z' fill='${
            dark ? `rgba(255,255,255,0.8)` : `rgba(0,0,0,0.8)`
          }' /%3E%3C/svg%3E")`
        }}
      />
      {text && <View className={cn('mt-24 f-24', dark ? 't-grey' : 't-dark')}>{text}</View>}
    </View>
  )
}

export default Loading
