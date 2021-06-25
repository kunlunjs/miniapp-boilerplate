import type { WithClassNameComponentProps } from '@/types'
import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import cn from 'classnames'
import React from 'react'
import styles from './index.module.less'

export interface ModalProps extends WithClassNameComponentProps {
  visible: boolean
  onChange?: (v: boolean) => void
}

const Modal: React.FC<ModalProps> = ({ className, visible, children, onChange }) => {
  const close = () => {
    onChange?.(false)
  }

  const clickContent = (e: ITouchEvent) => {
    e.stopPropagation()
  }

  return visible ? (
    <View onClick={close} className={cn('flex-column ai-center jc-center', styles.mask)}>
      <View onClick={clickContent} className={cn(styles.content, className)}>
        {children}
      </View>
    </View>
  ) : null
}

export default Modal
