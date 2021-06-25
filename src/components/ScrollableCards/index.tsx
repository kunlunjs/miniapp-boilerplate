import type { WithClassNameComponentProps } from '@/types'
import { pxToRpx, rpxToPx } from '@/utils'
import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import cn from 'classnames'
import type { CSSProperties, ReactNode } from 'react'
import React, { useRef, useState } from 'react'
import styles from './index.module.less'

interface WithID {
  id: string | number
}

// 滑动结束后最小阈值速度，小于该速度则没有惯性，单位 px/ms
const minSpeed = 10 / 1000

// 最前面的卡片可往下滑动的距离 单位rpx
const scrollBottomHeight = 632
const scrollBottomHeightPx = rpxToPx(scrollBottomHeight)

// 卡片间距离 单位rpx
const cardsDistance = 96

// 滑动距离放大倍数
const scrollTimes = 2

// 速度递减率
const speedDecreaseTimes = 0.95

// 每次速度递减时移动的距离 单位像素
const inertiaMoveDistance = 12

interface ScrollableCardsProps<T extends WithID> extends WithClassNameComponentProps {
  list: T[]
  onChange?: (index: number) => void
  itemRender: (data: T) => ReactNode
  itemHeight: number | ((data: T) => number)
  itemClassname?: string
}

function ScrollableCards<T extends WithID>({
  className,
  list,
  itemRender,
  itemHeight,
  itemClassname,
  onChange
}: ScrollableCardsProps<T>) {
  const timeRef = useRef<Date | null>()
  const startYRef = useRef(0)
  const distanceRef = useRef(0)
  const movedYRef = useRef(0)
  // 当前展示的卡片索引
  const activeIndexRef = useRef(0)
  // 因为是用clientY的值，所以单位是 px
  const [movedY, setMovedY] = useState(0)
  const movedYRpx = pxToRpx(movedY)
  // 向下最大可滑动距离 单位px
  const avaliableScrollY = rpxToPx((list.length - 1) * scrollBottomHeight)

  function setMoved(offsetY: number) {
    setMovedY(oldValue => {
      const offset = oldValue + scrollTimes * offsetY
      let targetY: number
      if (offsetY > 0) {
        targetY = Math.min(avaliableScrollY, offset)
      } else {
        targetY = Math.max(0, offset)
      }
      movedYRef.current = targetY
      const index = Math.round(targetY / scrollBottomHeightPx)
      if (activeIndexRef.current !== index) {
        activeIndexRef.current = index
        onChange?.(index)
      }
      return targetY
    })
  }

  const onTouchStart = (e: ITouchEvent) => {
    timeRef.current = new Date()
    startYRef.current = e.touches[0].clientY
  }
  const onTouchCancel = (e: ITouchEvent) => {
    timeRef.current = null
    startYRef.current = 0
  }
  const onTouchMove = (e: ITouchEvent) => {
    const offsetY = e.touches[0].clientY - startYRef.current
    startYRef.current = e.touches[0].clientY
    distanceRef.current = offsetY
    setMoved(offsetY)
  }
  const onTouchEnd = (e: ITouchEvent) => {
    try {
      // 是否是向下滑动
      const isDown = distanceRef.current > 0
      if ((isDown && movedYRef.current < avaliableScrollY) || (!isDown && movedYRef.current > 0)) {
        // speed
        const speed = Math.abs(
          distanceRef.current / (new Date().getTime() - timeRef.current!.getTime())
        )
        // 惯性滑动
        if (speed > minSpeed) {
          // let loopCount = 0
          // @ts-ignore
          function loop(_speed: number) {
            if (
              (isDown && movedYRef.current < avaliableScrollY) ||
              (!isDown && movedYRef.current > 0)
            ) {
              requestAnimationFrame(() => {
                const __speed = _speed * speedDecreaseTimes
                // 假设一个重绘时间是16ms
                setMoved(isDown ? inertiaMoveDistance : -1 * inertiaMoveDistance)
                // loopCount++
                if (__speed > minSpeed) {
                  loop(__speed)
                }
              })
            }
          }
          loop(speed)
        }
      }
    } catch (error) {
      console.error(e)
    }
  }

  function getView(item: T, index: number) {
    // 是否可见？
    // 可见时最小滑动距离
    const visibleMin = Math.max((index + 1 - 4) * scrollBottomHeight + 1, 0)
    // 可见时最大滑动距离
    const visibleMax = scrollBottomHeight + scrollBottomHeight * index
    // 范围内可见
    if (movedYRpx < visibleMax && movedYRpx >= visibleMin) {
      // console.log(index, 'visible')
      let style: CSSProperties
      // 是否在底部滑动？
      const isInBottomMin = scrollBottomHeight * index - (index > 0 ? 1 : 0)
      const isInBottomMax = scrollBottomHeight * index + scrollBottomHeight
      // 卡片高度
      const cardHeight = typeof itemHeight === 'number' ? itemHeight : itemHeight(item)
      // 在底部滑动
      if (movedYRpx < isInBottomMax && movedYRpx > isInBottomMin) {
        // const _moveY = isInBottomMax - movedYRpx
        style = {
          // opacity: (isInBottomMax - _moveY) / scrollBottomHeight,
          transform: `translateY(${movedYRpx - index * scrollBottomHeight}rpx)`
        }
        // console.log(index, 'in bottom')
      } else {
        // 在卡片组中
        const percent = (scrollBottomHeight * index - movedYRpx) / scrollBottomHeight

        const scale = 1 - percent * 0.1
        style = {
          transform: `scale(${scale}) translateY(-${
            // 需要补足因为缩放而减少的高度值
            percent * cardsDistance + ((1 - scale) / 2) * cardHeight
          }rpx)`
        }
        // console.log(index, 'in cards')
      }
      style.height = `${cardHeight}rpx`
      style.zIndex = 10000 - index
      return (
        <View key={item.id} className={cn(styles.card, itemClassname)} style={style}>
          {itemRender(item)}
        </View>
      )
    }
    // console.log(index, 'invisible')
    return undefined
  }

  return (
    <View
      className={cn('flex-column ai-center', styles.container, className)}
      onTouchStart={onTouchStart}
      onTouchCancel={onTouchCancel}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {list.map(getView)}
    </View>
  )
}

export default ScrollableCards
