import {
  downloadFile,
  hideLoading,
  openDocument,
  previewImage,
  showLoading,
  showModal
} from '@tarojs/taro'
import { toast } from './display'
import { addUrlPrefix } from './url'

/**
 * 支持预览的文件后缀名
 */
export const SUPPORT_PREVIEW_FILES = /^(jpe?g|gif|png|bmp|pdf|docx?|xlsx?|pptx?)$/
const IMAGE_FILES = /^(jpe?g|gif|png)$/

/**
 * 预览文件，如果支持的话
 * @param url 文件地址
 */
export function previewDoc(url: string) {
  return new Promise<void>((resolve, reject) => {
    const splited = url.split('.')
    const ext = splited[splited.length - 1]
    if (!SUPPORT_PREVIEW_FILES.test(ext)) {
      return toast('当前文件不支持预览')
    }
    showLoading({ title: '加载中' })
    const downloadTask = downloadFile({
      url: encodeURI(addUrlPrefix(url)),
      success: function (res) {
        const filePath = res.tempFilePath
        // 图片预览
        if (IMAGE_FILES.test(ext)) {
          previewImage({ current: filePath, urls: [filePath] })
        } else {
          openDocument({
            filePath: filePath,
            fail(res1) {
              console.error(res1)
              toast('当前文件不支持预览')
            }
          })
        }
        resolve()
      },
      fail: function (res) {
        if (res.errMsg === `downloadFile:fail exceed max file size`) {
          showModal({
            title: '提示 ',
            content: '文件过大不支持预览，请前往PC端查看',
            showCancel: false
          })
        }
        reject(res)
      },
      complete: () => {
        hideLoading()
      }
    })
    // @ts-ignore
    downloadTask.progress(res => {
      showLoading({
        title: `加载进度:${res.progress}%`
      })
    })
  })
}
