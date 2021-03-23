/**
 * 富文本内容替换，图片添加max-width防止超出显示区域
 * @param text 富文本内容
 * @returns 替换后的富文本内容
 */
export function replaceRichText(text: string) {
  if (!text) return ''
  return (
    text
      // 添加max-width样式
      .replace(/<img[^>]*>/gi, match => {
        let ret = match
          .replace(
            /style\s*\=\s*(['"][^'"]*)/gi,
            'style=$1;max-width:100%;height:auto;',
          )
          .replace(';;', ';')
        if (!ret.match(/ style=/)) {
          ret = ret.replace(/\/?>$/, ' style="max-width:100%;height:auto;" />')
        }
        return ret
      })
  )
}
