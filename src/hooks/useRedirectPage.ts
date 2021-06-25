import { getCurrentPages, navigateBack, navigateTo, switchTab, useDidShow } from '@tarojs/taro'
import { useRef } from 'react'

export default function useRedirectPage(redirectPage: string) {
  const redirectedRef = useRef(false)

  useDidShow(() => {
    if (redirectedRef.current) {
      redirectedRef.current = false
      const pages = getCurrentPages()
      if (pages.length > 1) {
        navigateBack()
      } else {
        switchTab({ url: '/pages/home/index' })
      }
    } else {
      redirectedRef.current = true
      navigateTo({ url: redirectPage })
    }
  })
}
