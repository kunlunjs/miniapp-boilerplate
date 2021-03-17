/* eslint-disable */
export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'

export interface ServiceRequestAndResponseMap {
  'articles@/articles': {
    params: {}
    query: {
      /**
       * @description Which field to use when ordering the results.
       */
      ordering?: any
      category_id?: any
      is_mandatory?: any
      /**
       * @description A page number within the paginated result set.
       */
      page?: any
      /**
       * @description Number of results to return per page.
       */
      page_size?: any
    }
    body: {}
    response: {
      count: number
      next?: string
      previous?: string
      results: {
        /**
         * ID
         */
        id?: number
        /**
         * Title
         * @description 标题
         */
        title?: string
        /**
         * Content
         * @description 内容
         */
        content?: string
        /**
         * Author
         * @description 作者
         */
        author?: string
        /**
         * Is mandatory
         * @description 是否必读
         */
        is_mandatory?: boolean
        /**
         * Duration
         * @description 时限
         */
        duration?: string
        /**
         * Deadline
         * @description 截止时间
         */
        deadline?: string
        /**
         * Attachments
         * @description 附件
         */
        attachments?: {}
        /**
         * Video
         * @description 视频
         */
        video?: string
        /**
         * Published at
         * @description 发布时间
         */
        published_at?: string
        category?: {
          /**
           * ID
           */
          id?: number
          /**
           * Title
           * @description 标题
           */
          title?: string
        }
        /**
         * Is finish
         */
        is_finish?: boolean
        cover?: string
      }[]
    }
  }
}

export type ServiceKeys = keyof ServiceRequestAndResponseMap

export type ServiceReturn = {
  [P in ServiceKeys]: (
    data?: ServiceRequestAndResponseMap[P]['body'] &
      ServiceRequestAndResponseMap[P]['params'] &
      ServiceRequestAndResponseMap[P]['query'],
    body?: ServiceRequestAndResponseMap[P]['body'],
  ) => Promise<
    ServiceFunctionResponse<ServiceRequestAndResponseMap[P]['response']>
  >
}

export interface ApiDefine {
  u: string
  m: Method
  // params
  p?: (string | number)[]
  // query
  q?: string[]
  // done / undone
  d: 0 | 1
}

export type Apis = Record<ServiceKeys, ApiDefine>

export interface RequestQuery {
  [key: string]: string | number | RequestQuery
}

export interface RequestBody {
  [key: string]: any
}

export interface ServiceFunctionResponse<T = any> {
  error: boolean
  data: T | null | undefined
  message?: string
  stack?: string | object
}

export type RequestAdapter<T = unknown> = (
  url: string,
  method: Method,
  query: RequestQuery,
  body: RequestBody,
  extraParams: any,
  done: boolean,
) => Promise<ServiceFunctionResponse<T>>
