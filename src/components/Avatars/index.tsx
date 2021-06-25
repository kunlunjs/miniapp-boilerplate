import { Image, View } from '@tarojs/components'
import React from 'react'
import styles from './index.module.less'

interface AvatarsProps {
  // 头像半径大小
  radius?: number
  max?: number
  avatars: string[]
}

const Avatars: React.FC<AvatarsProps> = ({ radius = 22, max = 3, avatars }) => {
  return (
    <View className="flex ai-center">
      {avatars.slice(0, max).map((avatar, index) => (
        <Image
          key={index}
          src={avatar}
          className={styles.avatar}
          style={{
            width: `${radius}rpx`,
            height: `${radius}rpx`
          }}
        />
      ))}
    </View>
  )
}

export default Avatars
