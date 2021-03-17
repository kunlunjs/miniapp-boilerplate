import Taro, { getCurrentPages, uploadFile } from '@tarojs/taro'
import { getToken, toast, querystringify, resolvePath } from '@/utils'
import { BASE_URL, COMMON_URL_PREFIX } from '@/constants'
import { Method, RequestBody, RequestQuery } from './yapi.api'
import { createServices } from './yapi.services'

const notNeedAuthPaths = ['/auth/login']

const services = createServices(
  async (
    url: string,
    method: Method,
    query: RequestQuery,
    body: RequestBody,
  ) => {
    const token = getToken()
    try {
      const qs = querystringify(query)
      const res = await Taro.request({
        url:
          // `http://apimock.nanjingzw.cn/mock/80/api${url}` +
          // (qs ? `?${qs}` : ''),
          // resolvePath(BASE_URL, COMMON_URL_PREFIX, url) + (qs ? `?${qs}` : ''),
          resolvePath(BASE_URL, COMMON_URL_PREFIX, url) + (qs ? `?${qs}` : ''),
        // @ts-ignore
        method: method,
        timeout: 120000,
        dataType: 'json',
        data: body,
        header: {
          'content-type': 'application/json',
          authorization:
            !token || notNeedAuthPaths.some(i => url.startsWith(i))
              ? undefined
              : `Bearer ${token}`,
        },
      })
      return statusHandler(res)
    } catch (error) {
      console.error(error)
      toast('检测到网络信号弱，请重试')
      return {
        data: null,
        error: true,
        message: 'request failed',
      }
    }
  },
)
export default services

let isRedirectToLoginFlag = false

function statusHandler(res: Taro.request.SuccessCallbackResult) {
  const { data, statusCode, errMsg } = res
  if (statusCode >= 200 && statusCode < 300) {
    return {
      data,
      error: false,
      message: errMsg,
    }
  } else if (statusCode === 403 || statusCode === 401) {
    const page = getCurrentPages()[0]
    if (
      // path是h5的属性
      !(page?.route || page?.path).includes('login/index') &&
      !isRedirectToLoginFlag
    ) {
      isRedirectToLoginFlag = true
      Taro.redirectTo({
        url: '/pages/login/index',
      }).then(() => (isRedirectToLoginFlag = false))
    }
    return { data: null, error: false, message: '' }
  } else {
    toast(data?.detail?.detail || data?.message || errMsg)
    return {
      data: null,
      error: true,
      message: errMsg,
    }
  }
}

export async function upload(filePath: string) {
  return uploadFile({
    filePath,
    url: '/api/upload',
    name: 'file',
    formData: {
      type: 'oss',
    },
    header: {
      authorization: `Bearer ${getToken()}`,
    },
  }).then(res => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return JSON.parse(res.data).url
    }
    throw new Error(res.errMsg)
  })
}
