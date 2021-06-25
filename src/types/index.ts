import type { CSSProperties } from 'react'

export * from './request'
export * from './user'

/**
 * 支持Data的组件属性接口
 */
export interface DataComponentProps<DataType> {
  data?: DataType
}

export interface OnClickComponentProps<EventType> {
  onClick?: (event: EventType) => void
}

export interface WithClassNameComponentProps {
  className?: string
}

export interface WithStyleComponentProps {
  style?: CSSProperties
}
