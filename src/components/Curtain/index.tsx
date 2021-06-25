import { Icon, View } from '@tarojs/components'
import cn from 'classnames'
import type { FC } from 'react'
import React from 'react'
import './index.less'

export interface CurtainProps {
  visible: boolean
  showClose?: boolean
  onChange?: (visible?: boolean) => void
}

const Curtain: FC<CurtainProps> = ({ visible, onChange, showClose = true, children }) => {
  return (
    <View className={cn('curtain', visible && 'visible')}>
      <View className="curtain-body">{children}</View>
      {showClose && (
        <View className="mt-40 curtain-close">
          <Icon
            type="cancel"
            size="36"
            color="#e9b875"
            onClick={() => onChange?.(false)}
            className="curtain-close-icon"
          />
        </View>
      )}
    </View>
  )
}

export default Curtain
