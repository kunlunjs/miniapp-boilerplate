import Taro, { hideLoading, setClipboardData } from '@tarojs/taro'

export const systemInfo = Taro.getSystemInfoSync()

/**
 * 状态栏高度 px
 */
export const statusBarHeight = systemInfo.statusBarHeight

/**
 * 胶囊按钮
 */
export const menuButtonInfo = Taro.getMenuButtonBoundingClientRect()

/**
 * 是否是ios设备
 */
export const isIOS = /^iOS/.test(systemInfo.system)

/**
 * 标题栏高度 px
 */
export const navigationBarHeight =
  2 * (menuButtonInfo.top - statusBarHeight) + menuButtonInfo.height

/**
 * 自定义tabbar高度
 */
// export const tabbarHeight = '100rpx'

/**
 * px单位转rpx单位
 */
export function pxToRpx(num = 0) {
  return (750 / systemInfo.screenWidth) * num
}

/**
 * rpx单位转px单位
 */
export function rpxToPx(num = 0) {
  return num / (750 / systemInfo.screenWidth)
}

/**
 * 复制内容
 */
export function copy(str: string, cb?: () => void) {
  setClipboardData({
    data: str,
    success: () => {
      hideLoading()
      cb?.()
    }
  })
}
