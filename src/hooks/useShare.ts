import { APP_NAME, ASSET_URL } from '@/constants'
import { resolvePath } from '@/utils'
import type { ShareAppMessageObject, ShareAppMessageReturn } from '@tarojs/taro'
import { useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro'

interface Return extends ShareAppMessageReturn {
  useCurrentPath?: boolean
}

const defaultShareImage = resolvePath(ASSET_URL, 'share.png')

export default function useShare(callback?: (payload?: ShareAppMessageObject) => Return) {
  const { path: _path, params } = useRouter()
  const currentPath = [
    _path,
    Object.keys(params || {})
      .reduce<string[]>((arr, paramKey) => {
        if (paramKey !== '__key_') {
          arr.push(`${paramKey}=${params[paramKey]}`)
        }
        return arr
      }, [])
      .join('&')
  ].join('?')
  useShareAppMessage(payload => {
    const ret = callback?.(payload)
    let path = '/pages/home/index'
    if (ret?.useCurrentPath) {
      path = currentPath
    }
    return {
      title: APP_NAME,
      path,
      imageUrl: defaultShareImage,
      ...ret
    }
  })
  useShareTimeline(() => {
    const ret = callback?.()
    let path = '/pages/home/index'
    if (ret?.useCurrentPath) {
      path = currentPath
    }
    return {
      title: APP_NAME,
      path: path,
      imageUrl: defaultShareImage,
      query: 'from=timeline'
    }
  })
}
