declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare module 'alife-logger' {
  export function singleton({
    pid: string,
    appType: string,
    imgUrl: string,
    enableLinkTrace: boolean,
    behavior: boolean,
    enableSPA: boolean,
  }) {}
}
