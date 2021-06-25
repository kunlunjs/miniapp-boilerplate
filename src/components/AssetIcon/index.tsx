import { ASSET_URL } from '@/constants'
import { resolvePath } from '@/utils'
import { Image } from '@tarojs/components'
import type { ImageProps } from '@tarojs/components/types/Image'
import type { CSSProperties } from 'react'
import React, { forwardRef } from 'react'
import type { AvailableAssetSRC } from './src'

interface AssetIconProps extends ImageProps {
  src: AvailableAssetSRC
  width?: number | string
  height?: number | string
  rotate?: number | string
  className?: string
  style?: CSSProperties
  mode?: Pick<ImageProps, 'mode'>['mode']
}

const AssetIcon = forwardRef<HTMLImageElement, AssetIconProps>(
  ({ src, style, width, height, rotate, mode = 'aspectFit', ...restProps }, ref) => {
    const _style: CSSProperties = {
      ...(style ?? {})
    }
    if (width !== undefined) {
      _style.width = `${width}rpx`
    }
    if (height !== undefined) {
      _style.height = `${height}rpx`
    }
    if (rotate !== undefined) {
      _style.transform = `rotate(${rotate}deg)`
    }
    return (
      <Image
        lazyLoad
        ref={ref}
        mode={mode}
        {...restProps}
        style={_style}
        src={`${resolvePath(ASSET_URL!, src)}`}
      />
    )
  }
)

AssetIcon.displayName = 'AssetIcon'

export default AssetIcon
