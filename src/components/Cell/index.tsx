import { View } from '@tarojs/components'
import { navigateTo } from '@tarojs/taro'
import cn from 'classnames'
import type { CSSProperties, ReactNode } from 'react'
import React, { useCallback } from 'react'
import AssetIcon from '../AssetIcon'
import type { AvailableAssetSRC } from '../AssetIcon/src'

interface CellProps {
  title: ReactNode
  subtitle?: ReactNode
  icon?: AvailableAssetSRC | ReactNode
  url?: string
  navigateFunc?: ({ url }: { url: string }) => void
  value?: ReactNode
  className?: string
  border?: boolean
  onClick?: () => void
  style?: CSSProperties
  arrow?: boolean
}

const Cell: React.FC<CellProps> = ({
  title,
  subtitle,
  icon,
  url,
  navigateFunc,
  value,
  className,
  border,
  onClick,
  style,
  arrow
}) => {
  const clickHandler = useCallback(() => {
    if (url) {
      ;(navigateFunc ?? navigateTo)({ url })
    } else if (onClick) {
      onClick()
    }
  }, [navigateFunc, onClick, url])

  return (
    <View
      className={cn('flex ai-center py-36', border ? 'border-b' : '', className)}
      style={style}
      onClick={clickHandler}
    >
      {icon &&
        (typeof icon === 'string' ? (
          <AssetIcon className="mr-24" src={icon as AvailableAssetSRC} width="40" height="40" />
        ) : (
          icon
        ))}
      <View className={cn('f-32', subtitle ? 'flex-column' : '')}>
        {title}
        {subtitle && <View className="mt-16 t-minor f-28">{subtitle}</View>}
      </View>
      <View className="flex ml-auto ai-center">
        {value}
        {(arrow ?? (url || onClick)) && (
          <AssetIcon
            className="ml-8"
            src="icon/arrow-down.svg"
            width="12"
            height="12"
            rotate="-90"
          />
        )}
      </View>
    </View>
  )
}

export default Cell
