/* eslint-disable */
import Taro, { getCurrentPages, uploadFile } from '@tarojs/taro'
import { RequestFunctionArgs, ResponseObject } from './a2s.types'

export interface CommonResponse<T = any> {
  data: T
  err_code: string
  err_message: string
  message: string
}

let _token = Taro.getStorageSync('token')

export function getToken() {
  return _token
}

export function setToken(_newToken: string) {
  _token = _newToken
}

export async function requestAdapter<
  T extends {
    data?: any
  }
>(args: RequestFunctionArgs): Promise<ResponseObject<T['data']>> {
  const { url, method, query, body, done = true } = args
  const token = getToken()
  try {
    const res = await Taro.request({
      url: (done ? 'https://your.api.com/v1' : 'https://mock.your.api.com/v1') + url,
      method: method.toUpperCase() as keyof Taro.request.method,
      timeout: 120000,
      dataType: 'json',
      data: method === 'GET' ? query : body,
      header: {
        ContentType: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    })
    return statusHandler<T>(res)
  } catch (error) {
    console.error(error)
    Taro.showToast({ title: '检测到网络信号弱，请重试' })
    return {
      data: null,
      error: true,
      message: 'request failed'
    }
  }
}

let isRedirectToLoginFlag = false

// 不同的service状态的处理函数
function statusHandler<T>(res: Taro.request.SuccessCallbackResult<CommonResponse>) {
  const { data, statusCode, errMsg } = res
  if (statusCode >= 200 && statusCode < 300) {
    return {
      data: data as unknown as CommonResponse<T>,
      error: false,
      message: errMsg
    }
  } else if (statusCode === 401) {
    Taro.removeStorage({ key: 'token' })
    setToken('')
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
    Taro.showToast({ title: data?.message || errMsg })
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
    let json: CommonResponse<{ url: string }>
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
