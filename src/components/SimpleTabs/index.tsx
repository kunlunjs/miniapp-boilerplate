import type { WithClassNameComponentProps } from '@/types'
import { Text, View } from '@tarojs/components'
import cn from 'classnames'
import type { CSSProperties, ReactNode } from 'react'
import React, { useRef, useState } from 'react'
import styles from './index.module.less'

export interface TabItem {
  title: ReactNode
  view: ReactNode | (() => ReactNode)
  cache?: boolean
}

interface SimpleTabsProps extends WithClassNameComponentProps {
  list: TabItem[]
}

const activeStyles: CSSProperties = {
  position: 'static',
  transform: 'none'
}

const deactiveStyles: CSSProperties = {
  position: 'absolute',
  transform: 'translateX(-200vw)'
}

const SimpleTabs: React.FC<SimpleTabsProps> = ({ className, list }) => {
  const [active, setActive] = useState(0)

  const cachedViewRef = useRef<ReactNode[]>([])

  function getView(index: number, _active: boolean, cache = true) {
    const view = list[index].view
    let _view: ReactNode
    if (!cache) {
      if (typeof view === 'function') {
        _view = view()
      } else {
        _view = view
      }
    } else if (!cachedViewRef.current[index]) {
      if (_active) {
        cachedViewRef.current[index] = typeof view === 'function' ? view() : view
        _view = cachedViewRef.current[index]
      } else {
        return undefined
      }
    } else {
      _view = cachedViewRef.current[index]
    }

    return (
      <View key={index} style={_active ? activeStyles : deactiveStyles}>
        {_view}
      </View>
    )
  }
  return (
    <View className={className}>
      <View className={cn('flex ai-center jc-center', styles.header)}>
        {list.map((item, index) => (
          <Text
            key={index}
            className={cn(styles.tab, {
              [styles.activeTab]: active === index
            })}
            onClick={() => setActive(index)}
          >
            {item.title}
          </Text>
        ))}
      </View>
      {list.map((_, index) => getView(index, index === active, _.cache))}
    </View>
  )
}

export default SimpleTabs
