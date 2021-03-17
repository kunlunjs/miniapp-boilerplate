import Taro from '@tarojs/taro'

export function toast(content: string, duration = 1500): void {
  Taro.showToast({ title: content, icon: 'none', duration })
}

// 富文本内容替换
export function replaceRichText(text: string) {
  if (!text) return ''
  return (
    text
      // 添加max-width样式
      .replace(/<img[^>]*>/gi, match => {
        let ret = match.replace(
          /style\s*?=\s*?(([‘"])[\s\S])*?\1/gi,
          'style="$2;max-width:100%;height:auto;"',
        )
        if (!ret.match(/ style=/)) {
          ret = ret.replace(/\/?>$/, 'style="max-width:100%;height:auto;" />')
        }
        return ret
      })
  )
}
