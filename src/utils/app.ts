import Taro from '@tarojs/taro'

export function toast(content: string, duration = 1500): void {
  Taro.showToast({ title: content, icon: 'none', duration })
}
