import { BASE_URL } from '../constants'
/**
 * 从文件url地址中抽出文件名，一般用于附件展示
 * @param url 文件url
 * @param maxLength 文件最大长度，超出截取
 * @returns 从url中获取的文件名
 */
export const getFileNameFromUrl = (url: string, maxLength?: number) => {
  if (!url) return ''
  const splited = url.split('/')
  const _path = decodeURIComponent(splited[splited.length - 1] ?? '')
  let ret = _path
  const splitedPath = _path.split('.')
  // 最大长度限制
  if (splitedPath.length) {
    ret = splitedPath.slice(0, splitedPath.length - 1).join('')

    if (maxLength) {
      ret = ret.slice(0, maxLength)
    }
    ret = ret + '.' + splitedPath[splitedPath.length - 1]
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
export function querystringify(obj: Record<string, string | number>): string {
  return Object.keys(obj)
    .reduce<string[]>((arr, key) => {
      const value = obj[key]
      if (value !== null && value !== undefined && value !== '') {
        // 数组使用逗号拼接
        if (Array.isArray(value)) {
          if (value.length) {
            arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`)
          }
        } else {
          arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        }
      }
      return arr
    }, [])
    .join('&')
}

function isOssUrl(url: string) {
  return url.includes('aliyun')
}

// https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.6.736.100466a3Oj9mcA
export function resizeOSSImage(
  originUrl: string,
  {
    mode,
    width,
    height,
    supportWebp = true
  }: {
    mode?: 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed'
    width?: number
    height?: number
    supportWebp?: boolean
  }
) {
  if (!originUrl || !isOssUrl(originUrl)) {
    return originUrl
  }
  if (!width && !height) {
    console.error('请为图片设置一个宽度或高度')
    return originUrl
  }
  const queryArgs = ['image/resize']
  if (mode) {
    queryArgs.push(`,m_${mode}`)
  } else if (width && height) {
    // 长宽都提供的情况下用fill模式
    queryArgs.push(`,m_fill`)
  }
  if (width) {
    queryArgs.push(`,w_${width}`)
  }
  if (height) {
    queryArgs.push(`,h_${height}`)
  }
  if (supportWebp !== false) {
    queryArgs.push('/format,webp')
  }
  return `${originUrl}?x-oss-process=${queryArgs.join('')}`
}
