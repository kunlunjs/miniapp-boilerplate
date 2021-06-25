import type { ButtonProps } from '@tarojs/components'
import { Button as OriginButton, View } from '@tarojs/components'
import cn from 'classnames'
import React from 'react'

interface _ButtonProps extends Omit<ButtonProps, 'size' | 'type'> {
  type?: 'primary' | 'default' | 'gold'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  full?: boolean
  outline?: boolean
  radius?: 'none' | 'sm' | 'md' | 'half' | true
  textClass?: string
}

const radiusClassMap = {
  none: '',
  sm: 'radius-sm',
  md: 'radius',
  half: 'btn-radius_half'
}

const Button: React.FC<_ButtonProps> = ({
  type = 'default',
  size = 'md',
  outline,
  full,
  radius = 'none',
  children,
  className,
  textClass,
  ...restProps
}) => {
  return (
    <OriginButton
      className={cn(
        'btn',
        `btn-${type}${outline ? '_outline' : ''}`,
        `btn-${size}`,
        radiusClassMap[radius === true ? 'md' : radius],
        full ? 'w-full' : '',
        className
      )}
      {...restProps}
    >
      <View className={cn('flex-inline ai-center jc-center', outline ? 't-gold' : '', textClass)}>
        {children}
      </View>
    </OriginButton>
  )
}

export default Button
