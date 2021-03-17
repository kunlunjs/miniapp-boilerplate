import { BASE_URL } from '@/constants'

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

// 为url添加url前缀
export function addUrlPrefix(url: string) {
  if (url && !/^https?:\/\//.test(url)) {
    return resolvePath(BASE_URL, 'api', url)
  }
  return url
}

// 路径合并
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

// qs
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
