import { BASE_URL } from '@/constants'

/**
 * 从文件url地址中抽出文件名，一般用于附件展示
 * @param url 文件url
 * @param maxLength 文件最大长度，超出截取
 * @returns 从url中获取的文件名
 */
export const getFileNameFromUrl = (url: string, maxLength: number) => {
  if (!url) return ''
  const splited = url.split('/')
  const _path = decodeURIComponent(splited[splited.length - 1] ?? '')
  let ret = _path
  if (maxLength) {
    const splitedPath = _path.split('.')
    // 最大长度限制
    if (splitedPath.length) {
      ret =
        splitedPath
          .slice(0, splitedPath.length - 1)
          .join('')
          .slice(0, maxLength) +
        '.' +
        splitedPath[splitedPath.length - 1]
    }
  }
  return ret
}

/**
 * 为url添加url前缀
 * @param url 地址
 * @returns 添加前缀后的地址
 */
export function addUrlPrefix(url: string) {
  if (url && !/^https?:\/\//.test(url)) {
    return resolvePath(BASE_URL, 'api', url)
  }
  return url
}

/**
 * 路径合并
 * @param paths 路径集合
 * @returns 拼接后的路径
 */
export function resolvePath(...paths: string[]) {
  return paths
    .map((path, index) => {
      let tmp = path.replace(/\/+$/, '')
      if (index) {
        tmp = tmp.replace(/^\/+/, '')
      }
      return tmp
    })
    .join('/')
}

/**
 * 对请求参数进行url序列化
 * @param obj 请求参数
 * @returns 序列化后的字符串
 */
export function querystringify(obj: { [key: string]: any }): string {
  return Object.keys(obj)
    .reduce<string[]>((arr, key) => {
      const value = obj[key]
      if (value !== null && value !== undefined && value !== '') {
        // 数组使用逗号拼接
        if (Array.isArray(value)) {
          if (value.length) {
            arr.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(
                value.join(','),
              )}`,
            )
          }
        } else {
          arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        }
      }
      return arr
    }, [])
    .join('&')
}
