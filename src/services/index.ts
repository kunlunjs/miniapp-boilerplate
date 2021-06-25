import { BASE_URL } from '@/constants'
import { CommonResponse } from '@/types/request'
import { getToken, querystringify, resolvePath, toast } from '@/utils'
import Taro, { getCurrentPages, uploadFile } from '@tarojs/taro'
import type { Method, RequestBody, RequestQuery } from './yapi.request'
import { createServices } from './yapi.services'

const notNeedAuthPaths = ['/auth/login']

// service服务入口
const services = createServices(
  async (url: string, method: Method, query: RequestQuery, body: RequestBody) => {
    const token = getToken()
    try {
      const qs = querystringify(query)
      const res = await Taro.request({
        url:
          // `http://apimock.nanjingzw.cn/mock/80/api${url}` +
          // (qs ? `?${qs}` : ''),
          // resolvePath(BASE_URL, COMMON_URL_PREFIX, url) + (qs ? `?${qs}` : ''),
          resolvePath(BASE_URL, COMMON_URL_PREFIX, url) + (qs ? `?${qs}` : ''),
        method: method,
        timeout: 120000,
        dataType: 'json',
        data: body,
        header: {
          'content-type': 'application/json',
          authorization:
            !token || notNeedAuthPaths.some(i => url.startsWith(i)) ? undefined : `Bearer ${token}`
        }
      })
      return statusHandler(res)
    } catch (error) {
      console.error(error)
      toast('检测到网络信号弱，请重试')
      return {
        data: null,
        error: true,
        message: 'request failed'
      }
    }
  }
)
export default services

let isRedirectToLoginFlag = false

// 不同的service状态的处理函数
function statusHandler(res: Taro.request.SuccessCallbackResult<CommonResponse>) {
  const { data, statusCode, errMsg } = res
  if (statusCode >= 200 && statusCode < 300) {
    return {
      data,
      error: false,
      message: errMsg
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
        url: '/pages/login/index'
      }).then(() => (isRedirectToLoginFlag = false))
    }
    return { data: null, error: false, message: '' }
  } else {
    toast(data?.message || errMsg)
    return {
      data: null,
      error: true,
      message: errMsg
    }
  }
}

/**
 * 小程序文件上传
 * @param filePath 文件路径
 * @returns 上传的文件路径
 */
export async function upload(filePath: string) {
  return uploadFile({
    filePath,
    url: '/api/upload',
    name: 'file',
    formData: {
      type: 'oss'
    },
    header: {
      authorization: `Bearer ${getToken()}`
    }
  }).then(res => {
    let json: CommonResponse
    try {
      json = JSON.parse(res.data)
    } catch (error) {
      throw new Error(res.errMsg)
    }
    if (res.statusCode >= 200 && res.statusCode < 300) {
      // TODO 改为业务真实结构
      return json.data.url
    } else {
      throw new Error(json.message)
    }
  })
}
