/* eslint-disable */
import { requestAdapter } from './a2s.adapter'
import type { RequestBody, RequestQuery } from './a2s.types'

/**
 * 将参数拆分为 query 和 body
 */
function extract(args: RequestBody | any, queryList: string[], paramList: string[]) {
  if (args && typeof args === 'object') {
    const query: RequestQuery = {}
    const body: RequestBody = {}
    Object.keys(args).forEach(key => {
      if (queryList.includes(key)) {
        query[key] = (args as RequestBody)[key] as RequestQuery
      } else if (!paramList.includes(key)) {
        body[key] = (args as RequestBody)[key]
      }
    })
    return { query, body }
  }
  return { query: {}, body: {} }
}

/**
 * 路径参数插值
 */
function replacePath(path: string, pathValueMap?: any) {
  return path
    .replace(/\/\{(\w+)}/g, (_, str) => {
      return `/${(pathValueMap as Record<string, string | number>)[str]}`
    })
    .replace(/\/:(\w+)/g, (_, str) => {
      return `/${(pathValueMap as Record<string, string | number>)[str]}`
    })
}

export const services = {
  '微信@刷新token'(args: {
    /**
     * @description 客户端ID
     * @example client_id=
     */
    client_id: number | boolean | string
    /**
     * @description 客户端Secret
     * @example client_secret=
     */
    client_secret: number | boolean | string
    /**
     * @description 这个字段写死，refresh_token
     * @example grant_type=refresh_token
     */
    grant_type: number | boolean | string
    /**
     * @description 刷新token
     * @example refresh_token=asdfadsfsaf
     */
    refresh_token: number | boolean | string
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      message: string
      /**
       * @description 后台错误简略堆栈
       */
      err_message: string
      /**
       * @description 返回数据
       */
      data?: {
        /**
         * @description 新闻详情
         */
        title: string
        /**
         * @description 发布人
         */
        authors: string
        /**
         * @description 发布时间
         */
        publish_at: string
        /**
         * @description 新闻来源
         */
        source: string
      }
    }>({
      url: replacePath('/wx/auth/refresh-token', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '微信@注册'(args: {
    /**
     * @description 客户端ID，需要小程序配置成静态变量，用于标记请求来源，可作简单接口鉴权
     * @example client_id=asdfdafafdaafdafs
     */
    client_id: number | boolean | string
    /**
     * @description 同上
     */
    client_secret: number | boolean | string
    /**
     * @description 从上传code接口，换取的openid
     * @example code=123123
     */
    openid: number | boolean | string
    /**
     * @description 微信给到的加密用户信息
     * @example opencrypted_string=asdfsafd
     */
    opencrypted_string: number | boolean | string
    /**
     * @description 偏移向量，解密会用到
     * @example iv=123
     */
    iv: number | boolean | string
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      message: string
      /**
       * @description 后台错误简略堆栈
       */
      err_message: string
      /**
       * @description 返回数据
       */
      data?: {
        /**
         * @description 用户Token，标记用户登录态
         */
        token: string
        /**
         * @description 过期时间
         */
        expires_in: string
      }
    }>({
      url: replacePath('/wx/auth/access-token', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '微信@预登录'(args?: any) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 微信授权解析获取到的openid，需要后续获取token使用
         */
        openid: string
      }
    }>({
      url: replacePath('/wx/auth/preload', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },

  '创美丽古都@列表'(args: {
    ordering?: any
    /**
  * @description 创游图鉴 travel-guide
 创游南京 cityscape
创匠技艺 cultrual-memory
创乐文博 museum
创新名人 outstanding-figure
创赏文学 local-legacy
创品美食 delicacy
   */
    plate?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          name: string
          en_name: string
          description: any
          /**
           * @description 媒体链接
           */
          media: any
          category: {
            id: number
            name: string
            en_name: string
            description: any
            content: {
              id: number
              title: string
              content: any
              cover: string
              video_url: string
              category_name: string
              author: any
              subtitle: any
              /**
               * @description 文旅营销官
               */
              officer: any
              /**
               * @description 直播时间
               */
              live_time: any
              /**
               * @description 直播地点
               */
              place: any
            }[]
          }[]
          /**
           * @description 推荐官
           */
          officer: {
            id?: number
            avatar?: string
            name?: string
            description?: string
            video?: string
            vod_id?: any
          }
          /**
           * @description 地表信息
           */
          Landmark?: {
            id: string
            /**
             * @description 别名
             */
            alias: string
            name: string
            description: string
            /**
             * @description 所属区域
             */
            belong_region: string
            video: string
            cover: string
            title: string
            vod_id: string
          }
        }[]
      }
    }>({
      url: replacePath('/content-plate', args),
      method: 'GET',
      ...extract(args, ['ordering', 'plate'], [])
    })
  },
  '创美丽古都@换一换'(args: { category?: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          title: string
          content: string
          cover: string
          video_url: string
          category_name: string
          author: any
          subtitle: any
          officer: any
          live_time: any
          place: any
          zaned: boolean
          zan_count: number
          publish_at: string
          source: any
          vod_id: any
          pixel_x: any
          pixel_y: any
          subcover: any
          outlink: any
        }[]
      }
    }>({
      url: replacePath('/content-refresh', args),
      method: 'GET',
      ...extract(args, ['category'], [])
    })
  },
  '创美丽古都@详情'(args: { id: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        title?: string
        publish_at?: string
        content?: string
        source?: any
        cover?: string
        video_url?: string
        views?: number
        author?: any
        subtitle?: any
        /**
         * @description 文旅营销官
         */
        officer?: any
        /**
         * @description 直播时间
         */
        live_time?: any
        /**
         * @description 地址
         */
        place?: any
        category_name?: string
        /**
         * @description x坐标
         */
        pixel_x?: any
        /**
         * @description y坐标
         */
        pixel_y?: any
        /**
         * @description 宽高
         */
        subcover?: any
        /**
         * @description 外链
         */
        outlink?: any
        vod_id?: any
      }
    }>({
      url: replacePath('/content/{id}/', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },

  '主宾国主宾城市@主宾内容详情'(args: { pk: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        title?: string
        publish_at?: string
        description?: string
        source?: string
        cover?: string
        video_url?: string
        views?: number
        images?: {
          id?: number
          title?: string
          images_url?: string
          created_at?: string
        }[]
        category_name?: string
        vod_id?: any
      }
    }>({
      url: replacePath('/visit/{pk}/', args),
      method: 'GET',
      ...extract(args, [], ['pk'])
    })
  },
  '主宾国主宾城市@主宾国主宾城市汇总'(args: {
    /**
     * @description zbg主宾国，zbcs主宾城市
     */
    plate: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          name: string
          en_name: string
          description: string
          media: string
          category: {
            id: number
            name: string
            en_name: string
            description: string
            content: {
              id: number
              title: string
              description: string
              cover: string
              video_url: string
              category_name: string
              source: string
              publish_at: string
              vod_id: any
            }[]
          }[]
        }[]
      }
    }>({
      url: replacePath('/visit-plate', args),
      method: 'GET',
      ...extract(args, ['plate'], [])
    })
  },
  '主宾国主宾城市@主宾国或主宾城市'(args: {
    /**
     * @description zbg主宾国，zbcs主宾城市
     */
    plate?: any
    /**
  * @description -------- 主宾国 --------
jcsj 精彩瞬间，
spsk 视频时刻，
zbghd 主宾国活动，
zbghz 主宾国合作

-------- 主宾城市 --------
jcsj 精彩瞬间，
spsk 视频时刻，
zbcshd 主宾城市活动，
zbcshz 主宾城市合作
   */
    category?: any
    search?: any
    ordering?: any
    limit?: any
    offset?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          title: string
          description: string
          cover: string
          video_url: string
          category_name: string
          source: string
          publish_at: string
          vod_id: any
        }[]
      }
    }>({
      url: replacePath('/visit', args),
      method: 'GET',
      ...extract(args, ['plate', 'category', 'search', 'ordering', 'limit', 'offset'], [])
    })
  },
  '主宾国主宾城市@主宾换一换'(args: {
    /**
     * @description zbg主宾国，zbcs主宾城市
     */
    plate?: any
    /**
  * @description -------- 主宾国 --------
jcsj 精彩瞬间，
spsk 视频时刻，
zbghd 主宾国活动，
zbghz 主宾国合作

-------- 主宾城市 --------
jcsj 精彩瞬间，
spsk 视频时刻，
zbcshd 主宾城市活动，
zbcshz 主宾城市合作
   */
    category?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          title: string
          description: string
          cover: string
          video_url: string
          category_name: string
          source: string
          publish_at: string
          vod_id: any
        }[]
      }
    }>({
      url: replacePath('/visit-refresh', args),
      method: 'GET',
      ...extract(args, ['plate', 'category'], [])
    })
  },

  '论坛活动@活动动态列表'(args: {
    /**
     * @description 科技高峰论坛、区域合作峰会、产业对接活动、开放创新沙龙、创新创业大赛、全民感知创新
     */
    plate: any
    is_refined: any
    search: any
    ordering: any
    limit: any
    offset: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id?: number
          title?: string
          source?: string
          subtitle?: string
          publish_at?: string
          is_refined?: boolean
          cover?: string
          plate_name?: string
          views?: number
          content?: string
        }[]
      }
    }>({
      url: replacePath('/forum-news', args),
      method: 'GET',
      ...extract(args, ['plate', 'is_refined', 'search', 'ordering', 'limit', 'offset'], [])
    })
  },
  '论坛活动@活动动态详情'(args: { id: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        title?: string
        source?: string
        subtitle?: string
        publish_at?: string
        is_refined?: boolean
        cover?: string
        plate_name?: string
        views?: number
        content?: string
      }
    }>({
      url: replacePath('/forum-news/{id}', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },
  '论坛活动@相关活动列表'(args: {
    /**
  * @description kjgflt 科技高峰论坛、
qyhzfh 区域合作峰会、
cydjhd 产业对接活动、
kfcxsl 开放创新沙龙、
cxcyds 创新创业大赛、
qmgzcx 全民感知创新
   */
    plate: any
    /**
     * @description 是否加精 0或1
     */
    is_refined: any
    /**
     * @description 搜索
     */
    search: any
    /**
     * @description 排序
     */
    ordering: any
    limit: any
    offset: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id?: number
          title?: string
          source?: string
          subtitle?: string
          publish_at?: string
          is_refined?: boolean
          cover?: string
          plate_name?: string
          views?: number
          start_time?: any
          end_time?: any
        }[]
      }
    }>({
      url: replacePath('/forum-activity', args),
      method: 'GET',
      ...extract(args, ['plate', 'is_refined', 'search', 'ordering', 'limit', 'offset'], [])
    })
  },
  '论坛活动@相关活动详情'(args: { id: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        title?: string
        source?: string
        subtitle?: string
        authors?: string
        publish_at?: string
        is_refined?: boolean
        cover?: string
        plate_name?: string
        views?: number
        content?: string
        start_time?: any
        end_time?: any
        /**
         * @description 主办方
         */
        organizer?: string
        /**
         * @description 协办方
         */
        co_organizer?: string
        /**
         * @description 承办方
         */
        undertaker?: string
        description?: string
        /**
         * @description 地点
         */
        location?: string
        /**
         * @description 出席人数
         */
        attendance_number?: number
        /**
         * @description 出席情况
         */
        attendance?: string
        /**
         * @description 活动目的
         */
        purpose?: string
        /**
         * @description 过程
         */
        process?: string
        /**
         * @description 直播回顾
         */
        live_review?: string
        images?: {
          id?: number
          title?: string
          images_url?: string
          created_at?: string
        }[]
        videos?: {
          id?: number
          title?: string
          video_url?: string
          created_at?: string
          cover?: any
          vod_id?: any
        }[]
      }
    }>({
      url: replacePath('/forum-activity/{id}', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },
  '论坛活动@论坛活动图集'(args: { id: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        title?: string
        images_url?: string[]
      }
    }>({
      url: replacePath('/forum-images/{id}', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },

  '预约活动@预约活动'(
    args: {
      /**
       * @description 分场活动：schedule
       * @example schedule
       */
      slug: any
    } & {
      module_id: number | boolean | string
      /**
       * @description 手机号区号（已登录用户无手机号时）
       */
      area_code?: number | boolean | string
      /**
       * @description 手机号（已登录用户无手机号时）
       */
      mobile?: number | boolean | string
      /**
       * @description 验证码（已登录用户无手机号时）
       */
      code?: number | boolean | string
    }
  ) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/appointment/{slug}/', args),
      method: 'POST',
      ...extract(args, [], ['slug'])
    })
  },

  '创新名城（五名）@列表汇总'(args: {
    ordering?: any
    /**
  * @description 名校	mingxiao
名所	mingsuo
名企	mingqi
名家	mingjia
名园区 mingyuanqu
   */
    plate?: any
    /**
  * @description 名校	mx
大院大所	dyds
新型研发机构	xxyfjg
集成电路	jcdl
人工智能	rgzn
软件和信息服务 rjhxxfw
新能源汽车 xnyqc
生物医药	swyy
其他	qt
新产品，新技术发布 xcp
名家	mj
名园区 myq
主题客厅	ztkt
四&quot;新&quot;应用场景 sxyycj
科技园 kjy
名港	mg
   */
    category?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          name: string
          en_name: string
          description: any
          media: any
          category: {
            id: number
            name: string
            en_name: string
            description: any
            content: {
              id: number
              title: string
              cover: string
              outlink: string
              tag: any
              category_name: string
              business_name: string
              logo: string
              description: string
              subdescription: string
            }[]
          }[]
        }[]
      }
    }>({
      url: replacePath('/company-plate', args),
      method: 'GET',
      ...extract(args, ['ordering', 'plate', 'category'], [])
    })
  },
  '创新名城（五名）@列表'(args: {
    ordering?: any
    /**
  * @description 名校	mx
大院大所	dyds
新型研发机构	xxyfjg
集成电路	jcdl
人工智能	rgzn
软件和信息服务 rjhxxfw
新能源汽车 xnyqc
生物医药	swyy
其他	qt
新产品，新技术发布 xcp
名家	mj
名园区 myq
主题客厅	ztkt
四&quot;新&quot;应用场景 sxyycj
科技园 kjy
名港	mg
   */
    category?: any
    limit?: any
    offset?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          title: string
          cover: string
          outlink: string
          tag: any
          category_name: string
          business_name: string
          logo: string
          description: string
          subdescription: string
        }[]
      }
    }>({
      url: replacePath('/company', args),
      method: 'GET',
      ...extract(args, ['ordering', 'category', 'limit', 'offset'], [])
    })
  },
  '创新名城（五名）@详情'(args: { id: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        title?: string
        publish_at?: string
        content?: string
        description?: string
        source?: string
        cover?: string
        outlink?: string
        video_url?: any
        vod_id?: any
        tag?: any
        business_name?: string
        contact_person?: string
        contact_phone?: string
        email?: string
        qq?: string
        logo?: string
        belong_region?: string
        business_description?: string
        views?: number
        category_name?: string
        subdescription?: string
      }
    }>({
      url: replacePath('/company/{id}/', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },

  '记忆盒子@创建'(args: {
    category: string
    words?: string
    images?: string[]
    voice?: string
    location: string
    gps: number[]
    open_time: string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        user?: {
          id?: number
          username?: string
          user_cate?: string
          is_register?: boolean
          email?: string
          avatar?: any
          wx_number?: any
          phone?: string
          area_code?: string
          balance?: number
          cost?: number
          reviewed?: boolean
          token?: any
        }
        gps?: number[]
        opened_sequence?: string[]
        created_at?: string
        updated_at?: string
        is_deleted?: boolean
        deleted_at?: any
        status?: string
        sequence?: number
        count?: number
        category?: string
        box_status?: string
        words?: string
        images?: any
        video?: any
        vod_id?: any
        summary?: any
        location?: string
        open_time?: any
      }
    }>({
      url: replacePath('/timebox', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '记忆盒子@开启'(args: {
    /**
     * @description 用户所在gps
     * @example &quot;[111.88749411596498, 36.08843253247911]&quot;
     */
    gps: number | boolean | string
    /**
     * @description 盒子的id
     * @example 12
     */
    box_id: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        user?: {
          id?: number
          username?: string
          user_cate?: string
          is_register?: boolean
          email?: string
          avatar?: any
          wx_number?: any
          phone?: string
          area_code?: string
          balance?: number
          cost?: number
          reviewed?: boolean
          token?: any
        }
        gps?: number[]
        opened_sequence?: string[]
        created_at?: string
        updated_at?: string
        is_deleted?: boolean
        deleted_at?: any
        status?: string
        sequence?: number
        count?: number
        category?: string
        box_status?: string
        words?: string
        images?: any
        video?: any
        vod_id?: any
        summary?: any
        location?: string
        open_time?: any
      }
    }>({
      url: replacePath('/timebox', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '记忆盒子@我的盒子-封存,解封'(args: {
    /**
  * @description 1表示查询达到盒子的开启时间的我创建的盒子; 
0表示查询未达到盒子的开启时间的我创建的盒子;
   * @example 0
  */
    is_reach_time: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          user: {
            id?: number
            username?: string
            user_cate?: string
            is_register?: boolean
            email?: string
            avatar?: string
            wx_number?: any
            phone?: string
            area_code?: string
            balance?: number
            cost?: number
            reviewed?: boolean
            token?: any
            nickname?: string
          }
          gps: number[]
          opened_sequence: {
            id: number
            username: string
            avatar: string
            nickname: string
          }[]
          images: string[]
          created_at: string
          updated_at: string
          is_deleted: boolean
          deleted_at: any
          status: string
          sequence: number
          count: number
          category: string
          box_status: string
          words: string
          video: any
          vod_id: any
          summary: any
          location: string
          open_time: string
        }[]
      }
    }>({
      url: replacePath('/mytimebox', args),
      method: 'GET',
      ...extract(args, ['is_reach_time'], [])
    })
  },
  '记忆盒子@排行榜'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        opened?: {
          id?: number
          username?: string
          avatar?: string
          nickname?: string
          score?: number
        }[]
        buried?: {
          id?: number
          username?: string
          avatar?: string
          nickname?: string
          score?: number
        }[]
      }
    }>({
      url: replacePath('/timeboxranking', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '记忆盒子@时间轴'(args: {
    /**
     * @description 盒子事件类型; 0表示我埋的盒子; 1表示我开的盒子。
     * @example 1
     */
    event_type?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          /**
           * @description 记录id
           */
          id: number
          /**
           * @description 用户信息
           */
          user: {
            id?: number
            username?: string
            user_cate?: string
            is_register?: boolean
            email?: string
            avatar?: string
            wx_number?: any
            phone?: string
            area_code?: string
            balance?: number
            cost?: number
            reviewed?: boolean
            token?: any
            nickname?: string
          }
          /**
           * @description 盒子信息
           */
          box: {
            id?: number
            user?: {
              id?: number
              username?: string
              user_cate?: string
              is_register?: boolean
              email?: string
              avatar?: string
              wx_number?: any
              phone?: string
              area_code?: string
              balance?: number
              cost?: number
              reviewed?: boolean
              token?: any
              nickname?: string
            }
            gps?: number[]
            opened_sequence?: string[]
            created_at?: string
            updated_at?: string
            is_deleted?: boolean
            deleted_at?: any
            status?: string
            sequence?: number
            count?: number
            category?: string
            box_status?: string
            words?: string
            images?: any
            video?: any
            vod_id?: any
            summary?: any
            location?: string
            open_time?: string
          }
          created_at: string
          updated_at: string
          is_deleted: boolean
          deleted_at: any
          /**
           * @description 盒子事件类型 0埋葬 1开启
           */
          event_type: string
        }[]
      }
    }>({
      url: replacePath('/timeboxtimeline', args),
      method: 'GET',
      ...extract(args, ['event_type'], [])
    })
  },
  '记忆盒子@游戏配置'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        /**
         * @description 搜索盒子范围值
         */
        search_area?: number
        /**
         * @description 打开盒子范围值
         */
        open_area?: number
        /**
         * @description 搜索范围单位 km
         */
        area_unit?: string
        /**
         * @description 盒子状态枚举值 &quot;created&quot;,    &quot;opening&quot;,   &quot;opened&quot;
         */
        box_status?: string[]
        /**
         * @description 盒子类型  &quot;words&quot;,   文字 ；&quot;img_words&quot;,   图文  ；&quot;voice&quot; 声音；
         */
        category?: string[]
        /**
         * @description 游戏规则
         */
        rules?: {
          /**
           * @description 规则id
           */
          id: number
          sequence: number
          /**
           * @description 规则有效开始时间
           */
          start: any
          /**
           * @description 规则有效结束时间
           */
          end: any
          /**
           * @description 规则对应事件类型 increase加分 decrease减分
           */
          event: string
          /**
           * @description 规则对应事件名称 枚举值
           */
          module: string
          /**
           * @description 规则对应事件中文名称
           */
          module_name_cn: any
          /**
           * @description 规则本身的类型    周期性触发 timerange  用户自定义触发 definition
           */
          cate: string
          /**
           * @description 废弃字段
           */
          definition: number
          /**
           * @description 对应的分数
           */
          points: number
          /**
           * @description 周期性规则的周期单元 day week month year
           */
          unit: string
          /**
           * @description 规则对应的次数限制
           */
          unit_number: number
          /**
           * @description 是否启用改规则
           */
          active: boolean
        }[]
      }
    }>({
      url: replacePath('/timeboxconf', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '记忆盒子@获取周围盒子'(args: {
    /**
     * @description 用户所在位置gps
     * @example &quot;[111.88749411596498, 36.08843253247911]&quot;
     */
    gps: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        user?: {
          id?: number
          username?: string
          user_cate?: string
          is_register?: boolean
          email?: string
          avatar?: any
          wx_number?: any
          phone?: string
          area_code?: string
          balance?: number
          cost?: number
          reviewed?: boolean
          token?: any
        }
        gps?: number[]
        opened_sequence?: string[]
        created_at?: string
        updated_at?: string
        is_deleted?: boolean
        deleted_at?: any
        status?: string
        sequence?: number
        count?: number
        category?: string
        box_status?: string
        words?: string
        images?: any
        video?: any
        vod_id?: any
        summary?: any
        location?: string
        open_time?: any
      }[]
    }>({
      url: replacePath('/timebox', args),
      method: 'GET',
      ...extract(args, ['gps'], [])
    })
  },
  '记忆盒子@详情'(args: {
    /**
     * @description 记忆盒子id
     * @example 1
     */
    id: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        user?: {
          id?: number
          username?: string
          user_cate?: string
          is_register?: boolean
          email?: string
          avatar?: any
          wx_number?: any
          phone?: string
          area_code?: string
          balance?: number
          cost?: number
          reviewed?: boolean
          token?: any
        }
        gps?: number[]
        opened_sequence?: string[]
        created_at?: string
        updated_at?: string
        is_deleted?: boolean
        deleted_at?: string
        status?: string
        sequence?: number
        count?: number
        category?: string
        box_status?: string
        words?: string
        images?: string[]
        voice?: string
        voice_len?: number
        vod_id?: string
        summary?: string
        location?: string
        open_time?: string
      }
    }>({
      url: replacePath('/timebox/{id}', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },

  '打卡点@打卡点关联打卡信息列表'(args: {
    limit?: any
    offset?: any
    ordering?: any
    search?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          title: string
          belong_region: string
          description: string
          clock_in: {
            id: number
            clock_in_time: string
            clock_in_image: {
              id: number
              image: string
            }[]
          }[]
        }[]
      }
    }>({
      url: replacePath('/clockin-point/all', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset', 'ordering', 'search'], [])
    })
  },
  '打卡点@打卡点列表'(args: { limit?: any; offset?: any; ordering?: any; search?: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          title: string
          belong_region: string
          description: string
        }[]
      }
    }>({
      url: replacePath('/clockin-point', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset', 'ordering', 'search'], [])
    })
  },
  '打卡点@打卡照片列表'(args: {
    limit?: any
    offset?: any
    ordering?: any
    /**
     * @description 打卡点ids
     */
    point_ids?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          image: string
        }[]
      }
    }>({
      url: replacePath('/clockin-image', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset', 'ordering', 'point_ids'], [])
    })
  },
  '打卡点@打卡照片换一换'(args: {
    limit?: any
    offset?: any
    ordering?: any
    /**
     * @description 打卡点ids
     */
    point_ids?: any
    /**
     * @description 照片id
     */
    id?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          image: string
        }[]
      }
    }>({
      url: replacePath('/clockin-image-refresh', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset', 'ordering', 'point_ids', 'id'], [])
    })
  },

  '文本审核@文本敏感词审核'(args: { text: number | boolean | string }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        code?: number
        content?: string
        dataId?: string
        msg?: string
        results?: {
          label?: string
          rate?: number
          scene?: string
          suggestion?: string
        }[]
        taskId?: string
      }[]
    }>({
      url: replacePath('/text-scan', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },

  '关于我们@政策超市'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        meeting_name?: string
        file?: {
          file_url: string
          name: string
        }[]
      }[]
    }>({
      url: replacePath('/policy-supermarket', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '关于我们@材料列表'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        meeting_name: string
        file: {
          file_url: string
          name: string
        }[]
      }[]
    }>({
      url: replacePath('/material-file/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },

  '媒体中心@新闻媒体列表'(args: {
    /**
     * @description 布尔值， 传true用来筛选首页轮播，其他不传
     * @example true
     */
    is_refined?: any
    /**
     * @description 文章分类：&quot;hot&quot;: &quot;热点观察&quot;, &quot;notice&quot;: &quot;媒体通告&quot;, &quot;signal&quot;: &quot;直播信号服务&quot;, &quot;material&quot;: &quot;资料中心&quot;
     * @example hot
     */
    name?: any
    /**
     * @description 每页条数
     */
    limit?: any
    /**
     * @description 每页起始下标
     */
    offset?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id?: number
          /**
           * @description 类型： 见请求参数
           */
          name?: string
          /**
           * @description 新闻标题
           */
          title?: string
          /**
           * @description 封面
           */
          cover?: string
          /**
           * @description 来源
           */
          source?: string
          /**
           * @description 发布时间
           */
          publish_at?: string
        }[]
      }
    }>({
      url: replacePath('/media/', args),
      method: 'GET',
      ...extract(args, ['is_refined', 'name', 'limit', 'offset'], [])
    })
  },
  '媒体中心@新闻详情'(args: {
    /**
     * @description 列表页返回的id
     * @example 1
     */
    pk: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 新闻媒体id
         */
        id: number
        /**
         * @description 类别
         */
        name: string
        /**
         * @description 文章标题
         */
        title: string
        /**
         * @description 副标题
         */
        subtitle: string
        /**
         * @description 封面
         */
        cover: string
        /**
         * @description 来源
         */
        source: string
        /**
         * @description 发布时间
         */
        publish_at: string
        /**
         * @description 内容(分类为直播信号服务时：直播流地址))
         */
        content: string
        /**
         * @description 资料中心材料数量
         */
        count: string
        /**
         * @description 媒体通告下附件
         */
        enclosure: {
          /**
           * @description 附件title
           */
          title: string
          /**
           * @description 附件file_url
           */
          file_url: string
        }[]
        /**
         * @description 资料中心    存在附件
         */
        extra: {
          /**
           * @description 附件类型（video: 视频，photo:图片，file：文件 ）
           */
          category?: string
          /**
           * @description 附件列表
           */
          files?: {
            /**
             * @description 标题
             */
            title?: string
            /**
             * @description url
             */
            file_url?: string
            /**
             * @description 附件类型
             */
            category?: string
            /**
             * @description 封面
             */
            cover?: string
          }[]
        }
      }
    }>({
      url: replacePath('/media/{pk}/', args),
      method: 'GET',
      ...extract(args, [], ['pk'])
    })
  },

  '注册登录@注册申请|获取图片验证码'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/capacha-image/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '注册登录@注册登录|发送短信验证码'(args: {
    /**
     * @description 手机号
     * @example 13333333333
     */
    phone: number | boolean | string
    /**
     * @description 图片验证码
     */
    capacha_code: number | boolean | string
    /**
     * @description 默认86
     * @example 86
     */
    area_code?: number | boolean | string
  }) {
    return requestAdapter<{
      err_code: string
      err_message: string
      message: string
      data: {}
    }>({
      url: replacePath('/signup/send-sms-code/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '注册登录@注册登录|手机号登录'(args: {
    /**
     * @description 手机区号，默认86
     */
    area_code?: number | boolean | string
    /**
     * @description 手机号
     */
    phone: number | boolean | string
    /**
     * @description 手机验证码
     */
    code: number | boolean | string
    /**
     * @description 用户角色（个人： personal,   媒体： media）
     * @example media
     */
    user_cate: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        /**
         * @description 用户id
         */
        id?: number
        /**
         * @description 用户名
         */
        username?: string
        /**
         * @description 用户角色（personal： 普通用户， guest：嘉宾）
         */
        user_cate?: string
        /**
         * @description 审核信息是否完善（普通用户true）
         */
        is_register?: boolean
        /**
         * @description 邮箱（普通用户为空字符串）
         */
        email?: string
        /**
         * @description 手机号（嘉宾为空字符串）
         */
        phone?: string
      }
    }>({
      url: replacePath('/signup/phone/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '注册登录@注册登录|登录'(args: {
    /**
     * @description 此字段支持 用户名、邮箱 + 手机号
     * @example username=用户名
     */
    username: number | boolean | string
    /**
     * @description 密码
     * @example password=12312312
     */
    password: number | boolean | string
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      message: string
      /**
       * @description 后台错误简略堆栈
       */
      err_message: string
      /**
       * @description 返回数据
       */
      data?: {
        /**
         * @description 用户名
         */
        username: string
        /**
         * @description 用户类型， 目前分两种 enterprise 企业， personal 个人
         */
        user_cate: string
        /**
         * @description 信息是否完整
         */
        is_register: boolean
      }
    }>({
      url: replacePath('/signin/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '注册登录@注册登录|邮箱密码注册'(args: {
    email: number | boolean | string
    password: number | boolean | string
    password_again: number | boolean | string
    /**
     * @description 图片验证码
     */
    capacha_code: number | boolean | string
    /**
     * @description guest：嘉宾， personal：个人；enterprise： 企业
     * @example guest
     */
    user_cate: number | boolean | string
  }) {
    return requestAdapter<{
      err_code: string
      err_message: string
      message: string
      data?: {
        username: string
        user_cate: string
        is_register: boolean
      }
    }>({
      url: replacePath('/signup/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '注册登录@登出'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/logout/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },

  '（弃用）云游南京湾|主宾国|创新对话@机构详情'(args: { pk: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        slug?: string
        name?: any
        logo?: string
        cover?: string
        video?: string
        title?: string
        description?: string
        contacts?: string
        business_name?: string
        business_description?: string
        qq?: string
        belong_region?: string
        address?: any
        phone?: string
        email?: string
        website?: any
        subdescription?: any
        zaned?: boolean
        zan_count?: number
        image?: string
        created_at?: string
      }
    }>({
      url: replacePath('/organization/{pk}/', args),
      method: 'GET',
      ...extract(args, [], ['pk'])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@地标分类列表'(args: {
    /**
     * @description 板块slug
     * @example slug=landmark
     */
    slug: any
  }) {
    return requestAdapter<{
      err_code: string
      err_message: string
      message: string
      data?: {
        results?: {
          id: string
          /**
           * @description 别名（外面分类名）
           */
          alias: string
          slug: string
          /**
           * @description 内部地标名
           */
          name: string
          /**
           * @description 介绍
           */
          description: string
          /**
           * @description 所属区域
           */
          belong_region: string
          cover: string
          title: string
          video: string
        }
      }
    }>({
      url: replacePath('/plate/landmark/', args),
      method: 'GET',
      ...extract(args, ['slug'], [])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@机构下内容分类列表'(args: {
    /**
     * @description 机构slug
     * @example tech
     */
    slug: any
    /**
     * @description 偏移量
     * @example offset=0
     */
    offset?: any
    /**
     * @description 每一页数量
     * @example limit=10
     */
    limit?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        /**
         * @description 结果
         */
        results: {
          /**
           * @description 分类slug
           */
          slug: string
          /**
           * @description 分类名
           */
          name: string
          /**
           * @description 分类描述
           */
          description: string
          /**
           * @description 封面图片
           */
          cover: string
          /**
           * @description 机构slug
           */
          organization_slug: string
          /**
           * @description 机构名称
           */
          organization_name: string
          article: {
            /**
             * @description 文章ID
             */
            id: string
            /**
             * @description 文章标题
             */
            title: string
            /**
             * @description 文章子标题
             */
            subtitle: string
            /**
             * @description 文章配图封面
             */
            cover: string
            /**
             * @description 像素x轴参数
             */
            pixel_x: string
            /**
             * @description 像素y轴参数
             */
            pixel_y: string
            /**
             * @description 文章内是否有视频嵌入
             */
            video_embedded: string
            /**
             * @description 是否有外链
             */
            outlinked: boolean
            /**
             * @description 外链地址
             */
            outlink: string
            /**
             * @description 机构slug
             */
            organization_slug: string
            /**
             * @description 机构名
             */
            organization_name: string
            /**
             * @description 发布时间
             */
            publish_at: string
            /**
             * @description 是否加精
             */
            is_refined: boolean
            /**
             * @description 来源
             */
            source: string
            /**
             * @description 子封面，主要用在创新名人下
             */
            subcover: string
          }[]
        }[]
        /**
         * @description 上一页数据API地址
         */
        previous: string
        /**
         * @description 下一页数据API地址
         */
        next: string
      }
    }>({
      url: replacePath('/organization/category/', args),
      method: 'GET',
      ...extract(args, ['slug', 'offset', 'limit'], [])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@机构下内容分类详情'(
    args: {
      /**
       * @description 分类ID
       * @example pk=1
       */
      pk: any
    } & {
      /**
       * @description 机构slug
       * @example tech
       */
      slug: any
      /**
       * @description 偏移量
       * @example offset=0
       */
      offset?: any
      /**
       * @description 每一页数量
       * @example limit=10
       */
      limit?: any
    }
  ) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        /**
         * @description 分类slug
         */
        slug: string
        /**
         * @description 分类名
         */
        name: string
        /**
         * @description banner链接
         */
        banner: string
        /**
         * @description 分类描述
         */
        description: string
        /**
         * @description 封面图片
         */
        cover: string
        /**
         * @description 机构slug
         */
        organization_slug: string
        /**
         * @description 机构名称
         */
        organization_name: string
      }
    }>({
      url: replacePath('/organization/category/{pk}/', args),
      method: 'GET',
      ...extract(args, ['slug', 'offset', 'limit'], ['pk'])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@机构列表'(args: {
    /**
     * @description 板块代称，支持多版块查询，slug以半角逗号拼接即可
     * @example slug=theme
     */
    slug: any
    offset?: any
    limit?: any
    /**
     * @description 搜索（机构名）
     */
    search?: any
    /**
     * @description 机构列表下，每一个机构提取文章数量，最大不能超过20，如果超过，直接调用列表页接口获取数据， 默认是1
     * @example article_count=1
     */
    article_count?: any
    /**
     * @description 机构列表下，每一个机构提取视屏或直播个数，最大不能超过20，如果超过，直接调用列表页接口获取数据，默认是1
     * @example conference_count=1
     */
    conference_count?: any
    /**
  * @description 默认按照created_at的倒序排

支持排序的字段有： created_at（创建时间）、sequence（权重）zan_count（点赞数量，只用在新产品、新技术、新应用场景发布）

多字段排序用逗号隔开、倒序排只要在字段前加-就可以
   * @example ordering=-created_at
  */
    ordering?: any
    /**
     * @description 名企地标接口获取，slug(双下划线)
     */
    landmark__slug?: any
    /**
     * @description 板块下机构分类列表中slug(双下划线)
     */
    categorys__slug?: any
    /**
     * @description 支持多个以,隔开
     * @example tag=a,b,c
     */
    tag?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        /**
         * @description 结果
         */
        results: {
          /**
           * @description 机构ID
           */
          id: string
          plate_slug: string
          /**
           * @description 机构代称，用在获取文章列表使用
           */
          slug: string
          /**
           * @description 机构名称
           */
          name: string
          /**
           * @description 机构LOGO
           */
          logo: string
          /**
           * @description 视频图片封面
           */
          cover: string
          /**
           * @description 视频地址
           */
          video: string
          /**
           * @description 名企下联系人
           */
          contacts: string
          /**
           * @description 名企下公司名称
           */
          business_name: string
          /**
           * @description 名企下公司描述
           */
          business_description: string
          /**
           * @description 名企下公司qq
           */
          qq: string
          /**
           * @description 名企下公司所属区域
           */
          belong_region: string
          /**
           * @description 名企下公司地址
           */
          address: string
          /**
           * @description 名企下公司联系电话
           */
          phone: string
          /**
           * @description 名企下公司email
           */
          email: string
          /**
           * @description 官网
           */
          website: string
          /**
           * @description 点赞数量
           */
          zan_count: number
          /**
           * @description 会议直播或视频信息
           */
          conference: {
            /**
             * @description 大会ID
             */
            id: number
            /**
             * @description 标题
             */
            title: string
            /**
             * @description 描述
             */
            description: string
            /**
             * @description 开始时间
             */
            start: string
            /**
             * @description 结束时间
             */
            end: string
            /**
             * @description 直播地址
             */
            live: string
            /**
             * @description 回放地址
             */
            video: string
            /**
             * @description 视频封面图片
             */
            cover: string
            /**
             * @description 直播状态 waiting 未开始 end已经结束 ing 进行中
             */
            live_status: string
            /**
             * @description 对话地区
             */
            region: string
            /**
             * @description 是否已预约true，false
             */
            appointed: boolean
            /**
             * @description 是否可预约true，false
             */
            can_appointment: boolean
            /**
             * @description 发布时间
             */
            publish_at: string
            /**
             * @description 第几期
             */
            phase: string
            /**
             * @description 机构slug
             */
            organization_slug: string
            /**
             * @description 机构名
             */
            organization_name: string
            /**
             * @description 是否点赞
             */
            zaned: boolean
            /**
             * @description 点赞数量
             */
            zan_count: number
          }[]
          /**
           * @description 创建时间
           */
          created_at: string
          /**
           * @description 分类
           */
          categorys: string[]
          /**
           * @description 活动安排
           */
          subdescription: string
          /**
           * @description 文章信息
           */
          article: {
            /**
             * @description 文章ID
             */
            id: string
            /**
             * @description 文章标题
             */
            title: string
            /**
             * @description 文章子标题
             */
            subtitle: string
            /**
             * @description 文章配图封面
             */
            cover: string
            /**
             * @description 像素x轴参数
             */
            pixel_x: string
            /**
             * @description 像素y轴参数
             */
            pixel_y: string
            /**
             * @description 文章内是否有视频嵌入
             */
            video_embedded: string
            /**
             * @description 是否有外链
             */
            outlinked: boolean
            /**
             * @description 外链地址
             */
            outlink: string
            /**
             * @description 机构slug
             */
            organization_slug: string
            /**
             * @description 机构名
             */
            organization_name: string
            /**
             * @description 发布时间
             */
            publish_at: string
            /**
             * @description 是否加精
             */
            is_refined: boolean
            /**
             * @description 来源
             */
            source: string
            /**
             * @description 子封面，主要用在创新名人下
             */
            subcover: string
          }[]
          /**
           * @description 缓存文章数据
           */
          data: {
            /**
             * @description 文章ID
             */
            id: string
            /**
             * @description 文章标题
             */
            title: string
          }[]
        }[]
        /**
         * @description 数量
         */
        count: string
        /**
         * @description 下一页数据API地址
         */
        next: string
        /**
         * @description 上一页数据API地址
         */
        previous: string
      }
    }>({
      url: replacePath('/organization/', args),
      method: 'GET',
      ...extract(
        args,
        [
          'slug',
          'offset',
          'limit',
          'search',
          'article_count',
          'conference_count',
          'ordering',
          'landmark__slug',
          'categorys__slug',
          'tag'
        ],
        []
      )
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@机构推荐'(args: {
    /**
     * @description 黑科技等slug
     * @example tech
     */
    slug: any
    /**
     * @description 排除当前页视频id
     * @example 1
     */
    id?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        /**
         * @description 结果
         */
        results: {
          /**
           * @description 机构ID
           */
          id: string
          /**
           * @description 机构代称，用在获取文章列表使用
           */
          slug: string
          /**
           * @description 机构名称
           */
          name: string
          /**
           * @description 机构LOGO
           */
          logo: string
          /**
           * @description 视频图片封面
           */
          cover: string
          /**
           * @description 视频地址
           */
          video: string
          /**
           * @description 会议直播或视频信息
           */
          conference: {
            /**
             * @description 大会ID
             */
            id: number
            /**
             * @description 标题
             */
            title: string
            /**
             * @description 描述
             */
            description: string
            /**
             * @description 开始时间
             */
            start: string
            /**
             * @description 结束时间
             */
            end: string
            /**
             * @description 直播地址
             */
            live: string
            /**
             * @description 回放地址
             */
            video: string
            /**
             * @description 视频封面图片
             */
            cover: string
            /**
             * @description 直播状态 waiting 未开始 end已经结束 ing 进行中
             */
            live_status: string
            /**
             * @description 对话地区
             */
            region: string
            /**
             * @description 是否已预约true，false
             */
            appointed: boolean
            /**
             * @description 是否可预约true，false
             */
            can_appointment: boolean
            /**
             * @description 发布时间
             */
            publish_at: string
            /**
             * @description 第几期
             */
            phase: string
            /**
             * @description 机构slug
             */
            organization_slug: string
            /**
             * @description 机构名
             */
            organization_name: string
          }[]
          /**
           * @description 文章信息
           */
          article: {
            /**
             * @description 文章ID
             */
            id: string
            /**
             * @description 文章标题
             */
            title: string
            /**
             * @description 文章子标题
             */
            subtitle: string
            /**
             * @description 文章配图封面
             */
            cover: string
            /**
             * @description 像素x轴参数
             */
            pixel_x: string
            /**
             * @description 像素y轴参数
             */
            pixel_y: string
            /**
             * @description 文章内是否有视频嵌入
             */
            video_embedded: string
            /**
             * @description 是否有外链
             */
            outlinked: boolean
            /**
             * @description 外链地址
             */
            outlink: string
            /**
             * @description 机构slug
             */
            organization_slug: string
            /**
             * @description 机构名
             */
            organization_name: string
            /**
             * @description 发布时间
             */
            publish_at: string
            /**
             * @description 是否加精
             */
            is_refined: boolean
            /**
             * @description 来源
             */
            source: string
          }[]
          /**
           * @description 缓存文章数据
           */
          data: {
            /**
             * @description 文章ID
             */
            id: string
            /**
             * @description 文章标题
             */
            title: string
          }[]
        }[]
        /**
         * @description 数量
         */
        count: string
        /**
         * @description 下一页数据API地址
         */
        next: string
        /**
         * @description 上一页数据API地址
         */
        previous: string
      }
    }>({
      url: replacePath('/organization/recommend/', args),
      method: 'GET',
      ...extract(args, ['slug', 'id'], [])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@文章详情'(args: { id: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        /**
         * @description 文章ID
         */
        id: string
        /**
         * @description 文章标题
         */
        title: string
        /**
         * @description 文章子标题
         */
        subtitle: string
        /**
         * @description 文章配图封面
         */
        cover: string
        /**
         * @description 像素x轴参数
         */
        pixel_x: string
        /**
         * @description 像素y轴参数
         */
        pixel_y: string
        /**
         * @description 文章内是否有视频嵌入
         */
        video_embedded: string
        /**
         * @description 是否有外链
         */
        outlinked: boolean
        /**
         * @description 外链地址
         */
        outlink: string
        /**
         * @description 机构slug
         */
        organization_slug: string
        /**
         * @description 机构名
         */
        organization_name: string
        /**
         * @description 发布时间
         */
        publish_at: string
        /**
         * @description 是否加精
         */
        is_refined: boolean
        /**
         * @description 来源
         */
        source: string
        /**
         * @description 文章内容
         */
        content: string
        /**
         * @description 文章浏览量
         */
        views: number
        /**
         * @description 子封面
         */
        subcover: string
        embedded_video?: {
          /**
           * @description 封面，有可能为空
           */
          cover: string
          /**
           * @description 视频链接
           */
          video: string
        }
      }
    }>({
      url: replacePath('/article/{id}/', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@板块下机构分类列表'(args: {
    /**
     * @description 板块slug
     * @example slug=park
     */
    slug: any
  }) {
    return requestAdapter<{
      err_code: string
      err_message: string
      message: string
      data?: {
        results?: {
          slug: string
          /**
           * @description category名
           */
          name: string
          id: string
        }
      }
    }>({
      url: replacePath('/plate/category/', args),
      method: 'GET',
      ...extract(args, ['slug'], [])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@直播列表'(args: {
    /**
     * @description 机构slug
     */
    slug: any
    /**
     * @description 偏移量
     * @example 1
     */
    offset?: any
    /**
     * @description 每页数量
     * @example 10
     */
    limit?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          title: string
          start: any
          end: any
          live: string
          video: string
          cover: string
          live_status: any
          region: string
          description: string
          appointed: boolean
          can_appointment: boolean
        }[]
      }
    }>({
      url: replacePath('/live-conference', args),
      method: 'GET',
      ...extract(args, ['slug', 'offset', 'limit'], [])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@视频列表'(args: {
    /**
     * @description 机构slug
     */
    slug: any
    /**
     * @description 偏移量
     * @example 1
     */
    offset?: any
    /**
     * @description 每页数量
     * @example 10
     */
    limit?: any
    /**
     * @description 排序方式，目前支持按权重(sequence)、发布时间(publish_at)、创建时间(created_at) 默认按权重倒序排列即（-sequence），正序的话，直接传字段就可以（倒序字段前加-）
     * @example -publish_at
     */
    ordering?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        results?: {
          /**
           * @description 大会ID
           */
          id: number
          /**
           * @description 标题
           */
          title: string
          /**
           * @description 描述
           */
          description: string
          /**
           * @description 开始时间
           */
          start: string
          /**
           * @description 结束时间
           */
          end: string
          /**
           * @description 直播地址
           */
          live: string
          /**
           * @description 回放地址
           */
          video: string
          /**
           * @description 视频封面图片
           */
          cover: string
          /**
           * @description 直播状态 waiting 未开始 end已经结束 ing 进行中
           */
          live_status: string
          /**
           * @description 对话地区
           */
          region: string
          /**
           * @description 是否已预约true，false
           */
          appointed: boolean
          /**
           * @description 是否可预约true，false
           */
          can_appointment: boolean
          /**
           * @description 发布时间
           */
          publish_at: string
          /**
           * @description 第几期
           */
          phase: string
          /**
           * @description 机构slug
           */
          organization_slug: string
          /**
           * @description 机构名
           */
          organization_name: string
          /**
           * @description 是否点赞
           */
          zaned: boolean
          /**
           * @description 点赞数量
           */
          zan_count: number
        }[]
      }
    }>({
      url: replacePath('/organization-video/', args),
      method: 'GET',
      ...extract(args, ['slug', 'offset', 'limit', 'ordering'], [])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@视频推荐'(args: {
    /**
     * @description 机构slug
     */
    slug: any
    /**
     * @description 需要排除的对象id
     */
    id?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        results?: {
          /**
           * @description 大会ID
           */
          id: number
          /**
           * @description 标题
           */
          title: string
          /**
           * @description 描述
           */
          description: string
          /**
           * @description 开始时间
           */
          start: string
          /**
           * @description 结束时间
           */
          end: string
          /**
           * @description 直播地址
           */
          live: string
          /**
           * @description 回放地址
           */
          video: string
          /**
           * @description 视频封面图片
           */
          cover: string
          /**
           * @description 直播状态 waiting 未开始 end已经结束 ing 进行中
           */
          live_status: string
          /**
           * @description 对话地区
           */
          region: string
          /**
           * @description 是否已预约true，false
           */
          appointed: boolean
          /**
           * @description 是否可预约true，false
           */
          can_appointment: boolean
          /**
           * @description 发布时间
           */
          publish_at: string
          /**
           * @description 第几期
           */
          phase: string
          /**
           * @description 机构slug
           */
          organization_slug: string
          /**
           * @description 机构名
           */
          organization_name: string
          /**
           * @description 是否点赞
           */
          zaned: boolean
          /**
           * @description 点赞数量
           */
          zan_count: number
        }[]
      }
    }>({
      url: replacePath('/organization-video/recommend/', args),
      method: 'GET',
      ...extract(args, ['slug', 'id'], [])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@黑科技列表'(args: {
    /**
     * @description 调/api/web/v1/organization/?slug=tech获取
     */
    slug?: any
    /**
  * @description zan_count:排行榜、按热度(取几条则limit传几)	
ordering=-zan_count 赞倒序
ordering=zan_count赞正序
ordering=-created时间倒序（默认）
ordering=created时间正序序
   * @example ordering=-zan_count
  */
    ordering?: any
    limit?: any
    offset?: any
    /**
     * @description 搜索?search=1111
     */
    search?: any
    /**
     * @description 所属区中文
     * @example belong_region=栖霞区
     */
    belong_region?: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          /**
           * @description 黑科技id
           */
          id: number
          /**
           * @description 视频封面
           */
          cover: string
          /**
           * @description 黑科技标题
           */
          title: string
          /**
           * @description 黑科技描述
           */
          description: string
          /**
           * @description 所属分类名
           */
          organization_name: string
          /**
           * @description 分类slug
           */
          organization_slug: string
          /**
           * @description 所属区
           */
          belong_region: string
          /**
           * @description 商户名
           */
          business_name: string
          /**
           * @description 公司logo
           */
          logo: string
          /**
           * @description 公司描述
           */
          business_description: string
          /**
           * @description 会议号
           */
          qq: string
          /**
           * @description 手机号
           */
          phone: string
          email: string
          /**
           * @description 点赞数
           */
          counter_value: number
          /**
           * @description 公司联系人
           */
          contacts: string
          /**
           * @description 是否已点赞
           */
          zaned: string
          /**
           * @description 视频
           */
          video: string
        }[]
      }
    }>({
      url: replacePath('/organization/tech/', args),
      method: 'GET',
      ...extract(args, ['slug', 'ordering', 'limit', 'offset', 'search', 'belong_region'], [])
    })
  },
  '（弃用）云游南京湾|主宾国|创新对话@黑科技详情'(args: { pk: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        cover?: string
        title?: string
        video?: string
        description?: string
        organization_name?: string
        organization_slug?: string
        belong_region?: string
        business_name?: string
        logo?: string
        phone?: string
        business_description?: string
        email?: string
        counter_value?: number
        contacts?: string
        qq?: string
        zaned?: boolean
        status?: string
        deny_reason?: string
        is_refined?: boolean
      }
    }>({
      url: replacePath('/organization/tech/{pk}/', args),
      method: 'GET',
      ...extract(args, [], ['pk'])
    })
  },

  '（弃用）对接洽谈@合作企业'(args?: any) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      message: string
      /**
       * @description 后台错误简略堆栈
       */
      err_message: string
      /**
       * @description 返回数据
       */
      data?: {
        results: {
          /**
           * @description 公司名称
           */
          name: string
          /**
           * @description 公司英文名称
           */
          english_name: string
          /**
           * @description 地址
           */
          address: string
          /**
           * @description 公司官网
           */
          website: string
          /**
           * @description 展位代号
           */
          exhibit_region: string
        }[]
      }
    }>({
      url: replacePath('/enterprise', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '（弃用）对接洽谈@项目签约'(args: { limit?: any; offset?: any }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        previous: string
        next: string
        count: number
        results: {
          name: string
          content: string
          time: string
          type: string
        }[]
      }
    }>({
      url: replacePath('/project/contract/', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset'], [])
    })
  },

  '（弃用）主宾国@主宾国推介'(args: { limit?: any; offset?: any }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        previous: string
        next: string
        count: number
        results: {
          country_name: string
          logo_path: string
          content: string
        }[]
      }
    }>({
      url: replacePath('/host-country/', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset'], [])
    })
  },

  '(弃用)t20@t20'(args?: any) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        results: {
          country_name: string
          /**
           * @description logo链接
           */
          logo_path: string
          /**
           * @description 介绍（富文本）
           */
          introduction: string
          /**
           * @description 成果展示（富文本）
           */
          content: string
        }[]
      }
    }>({
      url: replacePath('/t20/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },

  '用户@用户信息'(args?: any) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 姓
         */
        last_name: string
        /**
         * @description 名
         */
        first_name: string
        /**
         * @description 图片
         */
        photo: string
        /**
         * @description 性别（0,1）
         */
        gender: string
        /**
         * @description 国家
         */
        country: string
        /**
         * @description 手机号区号
         */
        area_code: string
        /**
         * @description 手机号
         */
        mobile: string
        /**
         * @description 工作单位
         */
        organization: string
        /**
         * @description 职位
         */
        job_title: string
        /**
         * @description 单位性质（返回1,2,3，与注册时值相同）
         */
        organization_type: string
        /**
         * @description 所属行业（返回1,2,3，与注册时值相同）
         */
        industry: string
        /**
         * @description 是否为院士
         */
        is_academy: boolean
        /**
         * @description 世界性奖项
         */
        is_world_awards: boolean
        /**
         * @description 用户角色(personal: 个人，guest：嘉宾用户, enterprise:企业用户)
         */
        user_cate: string
        /**
         * @description 是否为重要嘉宾
         */
        is_import: string
        /**
         * @description 审核状态（auditing: 审核中, pass: 审核通过, deny: 审核失败）
         */
        status: string
        /**
         * @description 审核失败原因
         */
        deny_reason: string
        /**
         * @description 所属板块
         */
        belong_region: string
        /**
         * @description 是否线上(true, false)
         */
        is_online: boolean
      }
    }>({
      url: replacePath('/user/profile/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '用户@用户日常任务'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        results?: {
          name: string
          limit: string
          points: string
          unit: string
          unit_number: number
          current_number: number
          is_finished: boolean
        }[]
      }
    }>({
      url: replacePath('/user/daily', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '用户@个人信息修改'(args: {
    /**
     * @description /api/web/v1/user/avatar/ 接口返回的id
     */
    avatar?: number | boolean | string
    /**
     * @description 用户名
     */
    username?: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        /**
         * @description 用户名
         */
        username?: string
        /**
         * @description 用户角色
         */
        user_cate?: string
        /**
         * @description 审核信息是否完善
         */
        is_register?: boolean
        /**
         * @description 邮箱（******@qq.com）已处理
         */
        email?: string
        /**
         * @description 头像
         */
        avatar?: string
        /**
         * @description 微信号
         */
        wx_number?: any
        /**
         * @description 手机号（170****1111）已处理
         */
        phone?: string
        /**
         * @description 手机区号86
         */
        area_code?: string
      }
    }>({
      url: replacePath('/user/simple-profile/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@修改微信用户信息'(args: {
    /**
     * @description 微信头像链接
     */
    avatar?: number | boolean | string
    /**
     * @description 微信昵称
     */
    nickname?: number | boolean | string
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 姓
         */
        last_name: string
        /**
         * @description 名
         */
        first_name: string
        /**
         * @description 图片
         */
        photo: string
        /**
         * @description 性别（0,1）
         */
        gender: string
        /**
         * @description 国家
         */
        country: string
        /**
         * @description 手机号区号
         */
        area_code: string
        /**
         * @description 手机号
         */
        mobile: string
        /**
         * @description 工作单位
         */
        organization: string
        /**
         * @description 职位
         */
        job_title: string
        /**
         * @description 单位性质（返回1,2,3，与注册时值相同）
         */
        organization_type: string
        /**
         * @description 所属行业（返回1,2,3，与注册时值相同）
         */
        industry: string
        /**
         * @description 是否为院士
         */
        is_academy: boolean
        /**
         * @description 世界性奖项
         */
        is_world_awards: boolean
        /**
         * @description 用户角色(personal: 个人，guest：嘉宾用户, enterprise:企业用户)
         */
        user_cate: string
        /**
         * @description 是否为重要嘉宾
         */
        is_import: string
        /**
         * @description 审核状态（auditing: 审核中, pass: 审核通过, deny: 审核失败）
         */
        status: string
        /**
         * @description 审核失败原因
         */
        deny_reason: string
        /**
         * @description 所属板块
         */
        belong_region: string
        /**
         * @description 是否线上(true, false)
         */
        is_online: boolean
        /**
         * @description 昵称
         */
        nickname: string
      }
    }>({
      url: replacePath('/user/wx-profile/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@小程序分享'(args: {
    /**
  * @description article 文章
miniprogram 小程序
   * @example article
  */
    category: number | boolean | string
    /**
     * @description category为文章时传递文章id, 小程序分享时传1认为是默认值
     */
    moudule_id: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        user?: {
          id?: number
          username?: string
          avatar?: string
          nickname?: string
        }
        created_at?: string
        updated_at?: string
        is_deleted?: boolean
        deleted_at?: any
        status?: string
        sequence?: number
        source?: string
        /**
         * @description 对应模块的ID
         */
        moudule_id?: string
        /**
         * @description 类型
         */
        category?: string
      }
    }>({
      url: replacePath('/share', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@修改密码|设置密码'(args: {
    password: number | boolean | string
    password_again: number | boolean | string
    /**
     * @description 旧密码
     */
    old_password: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/user/reset-password/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@国家列表接口【废弃】'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        results?: {
          id: number
          country_name: string
        }[]
      }
    }>({
      url: replacePath('/country/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '用户@头像列表'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        results?: {
          id: number
          avatar_url: string
        }[]
      }
    }>({
      url: replacePath('/user/avatar/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '用户@我的活动'(args: {
    /**
     * @description 每页条数
     */
    limit?: any
    /**
     * @description 每页起始下标默认0
     */
    offset?: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        count: number
        next: any
        previous: any
        results: {
          /**
           * @description 点赞模块（目前有SegmentSchedule:主题大会、云霄紫金山等下的直播，ContentOrganizationLive: 云游南京湾及主宾国连线中的直播）
           */
          module: string
          /**
           * @description 预约对象的id
           */
          module_id: number
          /**
           * @description 预约对象的meta
           */
          meta?: {
            /**
             * @description 标题
             */
            title: number
            /**
             * @description 地点
             */
            hall_name: string
            /**
             * @description 开始时间
             */
            start: string
            /**
             * @description 结束时间
             */
            end: any
            /**
             * @description 嘉宾
             */
            guest: string
            /**
             * @description 嘉宾介绍
             */
            guest_profile: string
            /**
             * @description 直播状态
             */
            activity_status: string
            /**
             * @description 直播描述
             */
            description: string
          }
        }[]
      }
    }>({
      url: replacePath('/appointment/', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset'], [])
    })
  },
  '用户@提交审查信息【废弃】'(args: {
    /**
     * @description 用户姓名
     * @example person_name=张三
     */
    person_name: number | boolean | string
    /**
     * @description 用户身份证号
     * @example person_idnumber=1223123213
     */
    person_idnumber: number | boolean | string
    /**
     * @description 用户其他说明事项
     * @example person_instruction=阿福速度
     */
    person_instruction?: number | boolean | string
    /**
     * @description 公司名
     * @example enterprise_name=科技
     */
    enterprise_name?: number | boolean | string
    /**
     * @description 统一社会信用代码
     * @example enterprise_taxnumber=qwqwqw
     */
    enterprise_taxnumber?: number | boolean | string
    /**
     * @description 企业其他说明事项
     * @example person_instruction=啊算法算法
     */
    enterprise_instruction?: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/user/review/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@提交知识产权问题【废弃】'(args: {
    /**
     * @description 姓名
     */
    name: number | boolean | string
    /**
     * @description 公司
     */
    company: number | boolean | string
    /**
     * @description 职称
     */
    post: number | boolean | string
    /**
     * @description 手机号
     */
    phone: number | boolean | string
    /**
     * @description 邮箱
     */
    email: number | boolean | string
    /**
     * @description 问题描述
     */
    question: number | boolean | string
    /**
     * @description 验证码
     */
    capacha_code: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/user/ipr-question/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@注销用户'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/user/written-off/', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '用户@(废弃)点赞列表'(
    args: {
      /**
       * @description 点赞slug
       * @example tech
       */
      slug: any
    } & {
      limit?: any
      offset?: any
    }
  ) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          /**
           * @description 黑科技id
           */
          id: number
          /**
           * @description 视频封面
           */
          cover: string
          /**
           * @description 黑科技标题
           */
          title: string
          /**
           * @description 黑科技描述
           */
          description: string
          /**
           * @description 所属分类名
           */
          organization_name: string
          /**
           * @description 分类slug
           */
          organization_slug: string
          /**
           * @description 所属区
           */
          belong_region: string
          /**
           * @description 商户名
           */
          business_name: string
          /**
           * @description 公司logo
           */
          logo: string
          /**
           * @description 公司描述
           */
          business_description: string
          /**
           * @description 会议号
           */
          qq: string
          /**
           * @description 手机号
           */
          phone: string
          email: string
          /**
           * @description 点赞数
           */
          counter_value: number
          /**
           * @description 公司联系人
           */
          contacts: string
          /**
           * @description 是否已点赞
           */
          zaned: string
          /**
           * @description 视频
           */
          video: string
        }[]
      }
    }>({
      url: replacePath('/zan/{slug}/', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset'], ['slug'])
    })
  },
  '用户@用户|用户信息完善'(args: {
    /**
     * @description （嘉宾必须）姓
     */
    last_name: number | boolean | string
    /**
     * @description （嘉宾必须）名
     */
    first_name: number | boolean | string
    /**
     * @description （嘉宾必须）性别（0：男，1： 女）
     */
    gender: number | boolean | string
    /**
     * @description （嘉宾必须）国家名
     */
    country: number | boolean | string
    /**
     * @description （嘉宾非必须）单位性质返回中文单位性质
     */
    organization_type?: number | boolean | string
    /**
     * @description （嘉宾非必须）单位性质返回中文单位性质
     */
    industry?: number | boolean | string
    /**
     * @description （嘉宾非必须）是否为院士（bool值，true， false， 默认false）
     * @example false
     */
    is_academy?: number | boolean | string
    /**
     * @description （嘉宾非必须）是否有世界性大奖（bool值，true， false， 默认false）
     * @example false
     */
    is_world_awards?: number | boolean | string
    /**
     * @description （嘉宾必须）是否为重要嘉宾
     * @example false
     */
    is_import: number | boolean | string
    /**
     * @description （嘉宾必须）所属板块接口中的area_name
     */
    belong_region: number | boolean | string
    /**
     * @description （嘉宾非必须）是否线上（bool值，true， false， 默认true）
     * @example true
     */
    is_online?: number | boolean | string
    /**
     * @description （嘉宾必须、媒体必须）工作单位
     */
    organization: number | boolean | string
    /**
     * @description （嘉宾、媒体）默认是86
     * @example 86
     */
    area_code?: number | boolean | string
    /**
     * @description （嘉宾、媒体必须）手机号
     */
    mobile?: number | boolean | string
    /**
     * @description （嘉宾、媒体必须）照片unique_name， 从统一文件上传接口上传(修改信息时可未做修改可不传)
     */
    photo?: number | boolean | string
    /**
     * @description （嘉宾必须、媒体必须）职位
     */
    job_title: number | boolean | string
    /**
     * @description (媒体必须)姓名
     */
    name?: number | boolean | string
    /**
     * @description (媒体必须)单位地址
     */
    job_addr?: number | boolean | string
    /**
     * @description (媒体必须)记者证或单位证明文件（url或文件上传接口返回的unique_name都可）
     */
    support_file?: number | boolean | string
    /**
     * @description (媒体必须)身份证号码
     */
    id_number?: number | boolean | string
  }) {
    return requestAdapter<{
      err_code: string
      err_message: string
      message: string
      data: {
        /**
         * @description （嘉宾）姓
         */
        last_name?: string
        /**
         * @description （嘉宾）名
         */
        first_name?: string
        /**
         * @description （嘉宾、媒体）照片
         */
        photo?: string
        /**
         * @description （嘉宾）&quot;0&quot;： 男, &quot;1&quot;：女
         */
        gender?: string
        /**
         * @description （嘉宾）中国（直接返回国家）
         */
        country?: string
        /**
         * @description （嘉宾、媒体）手机号区号
         */
        area_code?: string
        /**
         * @description （嘉宾、媒体）手机号
         */
        mobile?: string
        /**
         * @description （嘉宾、媒体）工作单位
         */
        organization?: string
        /**
         * @description （嘉宾、媒体）职位
         */
        job_title?: string
        /**
         * @description （嘉宾）单位性质返回中文单位性质
         */
        organization_type?: string
        /**
         * @description （嘉宾）所属行业返回中文所属行业
         */
        industry?: string
        /**
         * @description （嘉宾）是否为院士
         */
        is_academy?: boolean
        /**
         * @description （嘉宾）是否为重要嘉宾
         */
        is_import?: boolean
        /**
         * @description （嘉宾）所属板块
         */
        belong_region?: string
        /**
         * @description （嘉宾）世界性奖项
         */
        is_world_awards?: string
        /**
         * @description （嘉宾、媒体）审核状态（auditing: 审核中, pass: 审核通过, deny: 审核失败， uncommit: 未提交组委会审核）
         */
        status?: string
        /**
         * @description （嘉宾、媒体）审核失败原因
         */
        deny_reason?: string
        /**
         * @description （嘉宾、媒体）用户角色(personal: 个人，guest：嘉宾用户, media:媒体用户)
         */
        user_cate?: string
        /**
         * @description （嘉宾）是否线上（bool值，true， false）
         */
        is_online?: boolean
        /**
         * @description （媒体）姓名
         */
        name?: string
        /**
         * @description （媒体）身份证
         */
        id_number?: string
        /**
         * @description （媒体）工作地址
         */
        job_addr?: string
        /**
         * @description （媒体）证明材料
         */
        support_file?: string
        /**
         * @description （媒体）电子通行证（审核通过才有，可能未及时生成）
         */
        pass_card?: string
      }
    }>({
      url: replacePath('/user/profile/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@用户|简单个人信息'(args?: any) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 用户名
         */
        username: string
        /**
         * @description 用户类型
         */
        user_cate: string
        /**
         * @description 信息是否完整
         */
        is_register: boolean
        /**
         * @description 返回url，若无头像则返回null
         */
        avatar: string
        /**
         * @description 用户id
         */
        id: number
        /**
         * @description 用户email(已处理*****@qq.com)
         */
        email: string
        /**
         * @description 微信号
         */
        wx_number: string
        /**
         * @description 手机号（171****1111）已处理
         */
        phone: string
        /**
         * @description 手机号区号
         */
        area_code: string
        /**
         * @description 用户创新币余额
         */
        balance: string
        /**
         * @description 用户消耗创新币数量
         */
        cost: string
        /**
         * @description 是否提交审查信息
         */
        reviewed: boolean
      }
    }>({
      url: replacePath('/user/simple-profile/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '用户@用户发布点赞数量'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        /**
         * @description 头像
         */
        avatar: string
        /**
         * @description 用户名
         */
        username: string
        /**
         * @description 黑科技点赞数量
         */
        zan_count: number
        /**
         * @description 发布数量
         */
        release: number
      }
    }>({
      url: replacePath('/user/action/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '用户@预约|嘉宾预约发送验证码'(args: {
    /**
     * @description 手机号区号(默认值86)
     */
    area_code?: number | boolean | string
    /**
     * @description 手机号
     */
    phone: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/appointment/send-code/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@【废弃】修改密码|检查邮箱(弃用，只在最后一步全部提交)'(args: {
    email: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        secret: string
      }
    }>({
      url: replacePath('/user/check-email/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@【废弃】删除我的黑科技'(args: {
    /**
     * @description 黑科技id
     * @example 1
     */
    pk: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/user/tech/{pk}/', args),
      method: 'DELETE',
      ...extract(args, [], ['pk'])
    })
  },
  '用户@【废弃】修改我的需求详情'(
    args: {
      /**
       * @description ID字段
       * @example pk=1
       */
      pk: any
    } & {
      title: number | boolean | string
      description: number | boolean | string
      organization: number | boolean | string
      enclosure?: number | boolean | string
      phone: number | boolean | string
      email?: number | boolean | string
    }
  ) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/user/keytech-collection/{pk}/', args),
      method: 'POST',
      ...extract(args, [], ['pk'])
    })
  },
  '用户@【废弃】我的需求列表'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      /**
       * @description 返回数据
       */
      data?: {
        count: number
        next: any
        previous: any
        results: {
          /**
           * @description id
           */
          id: number
          /**
           * @description 标题
           */
          title: string
          /**
           * @description 介绍
           */
          description: string
          /**
           * @description 单位名称
           */
          organization: string
          /**
           * @description 手机号
           */
          phone: string
          /**
           * @description 邮箱
           */
          email: string
          /**
           * @description 附件列表
           */
          enclosure: string[]
        }[]
      }
    }>({
      url: replacePath('/user/keytech-collection/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '用户@【废弃】发布我的需求列表'(args: {
    /**
     * @description 标题
     */
    title: number | boolean | string
    /**
     * @description 描述
     */
    description: number | boolean | string
    /**
     * @description 机构
     */
    organization: number | boolean | string
    /**
     * @description 附件，多个url以逗号隔开
     */
    enclosure?: number | boolean | string
    /**
     * @description 手机号
     */
    phone: number | boolean | string
    /**
     * @description 邮箱
     */
    email?: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      /**
       * @description 返回数据
       */
      data?: {}
    }>({
      url: replacePath('/user/keytech-collection/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@【废弃】黑科技所属板块接口'(args?: any) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        results: {
          id: number
          /**
           * @description 所属版块名
           */
          area_name: string
        }[]
      }
    }>({
      url: replacePath('/tech-region/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '用户@【废弃】我的需求详情'(args: {
    /**
     * @description ID字段
     * @example pk=1
     */
    pk: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        /**
         * @description id
         */
        id: number
        /**
         * @description 标题
         */
        title: string
        /**
         * @description 介绍
         */
        description: string
        /**
         * @description 单位名称
         */
        organization: string
        /**
         * @description 手机号
         */
        phone: string
        /**
         * @description 邮箱
         */
        email: string
        /**
         * @description 附件列表
         */
        enclosure: string[]
      }
    }>({
      url: replacePath('/user/keytech-collection/{pk}/', args),
      method: 'GET',
      ...extract(args, [], ['pk'])
    })
  },
  '用户@【废弃】我的黑科技|列表'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          /**
           * @description 黑科技id
           */
          id?: number
          /**
           * @description 视频封面
           */
          cover?: string
          /**
           * @description 视频链接
           */
          video?: string
          /**
           * @description 黑科技标题
           */
          title?: string
          /**
           * @description 黑科技介绍
           */
          description?: string
          /**
           * @description 所属区
           */
          belong_region?: string
          /**
           * @description 黑科技描述
           */
          business_description?: string
          /**
           * @description logo
           */
          logo?: string
          /**
           * @description 黑科技分类
           */
          organization_name?: string
          /**
           * @description 黑科技分类slug
           */
          organization_slug?: string
          /**
           * @description 联系人或商家名
           */
          business_name?: string
          /**
           * @description 手机号
           */
          phone?: string
          /**
           * @description 邮箱
           */
          email?: string
          /**
           * @description 审核状态（uncommit: 未提交组委会审核auditing：审核中，pass： 审核通过， deny： 审核失败）
           */
          status?: string
          /**
           * @description 点赞数量
           */
          counter_value?: number
          /**
           * @description 联系人
           */
          contacts?: string
          /**
           * @description qq
           */
          qq?: string
          /**
           * @description 是否点赞
           */
          zaned?: string
          /**
           * @description 拒绝原因
           */
          deny_reason?: string
        }[]
      }
    }>({
      url: replacePath('/user/tech/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '用户@[废弃]我的黑科技|编辑修改'(
    args: {
      /**
       * @description 黑科技id
       * @example 1
       */
      pk: any
    } & {
      /**
       * @description 黑科技标题（没修改不传， 下同）
       * @example 这是黑科技标题
       */
      title?: number | boolean | string
      /**
       * @description 黑科技介绍
       * @example 这是黑科技介绍
       */
      description?: number | boolean | string
      /**
       * @description 海报 上传接口返回的unique_name或url
       */
      cover?: number | boolean | string
      /**
       * @description 调/api/web/v1/organization/?slug=tech
       * @example 1
       */
      organization_id?: number | boolean | string
      /**
       * @description 视屏上传接口返回的unique_name或url
       * @example asdfsa.mp4
       */
      video?: number | boolean | string
      /**
       * @description 黑科技所属板块接口（area_name）
       */
      belong_region?: number | boolean | string
      /**
       * @description 联系人或商家信息
       * @example 联系人
       */
      business_name?: number | boolean | string
      /**
       * @description 手机号
       * @example 13000000000
       */
      phone?: number | boolean | string
      /**
       * @description 邮箱
       * @example 123456@qq.com
       */
      email?: number | boolean | string
      /**
       * @description 企业qq
       */
      qq?: number | boolean | string
      /**
       * @description logo  上传接口返回的unique_name或url
       */
      logo?: number | boolean | string
      /**
       * @description 附件 上传接口返回的unique_name或url， 多个附件以&quot;,&quot;隔开
       */
      enclosure?: number | boolean | string
      /**
       * @description 企业介绍
       */
      business_description?: number | boolean | string
      /**
       * @description 企业所在地
       */
      address?: number | boolean | string
      /**
       * @description 企业联系人
       */
      contacts?: number | boolean | string
    }
  ) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/user/tech/{pk}/', args),
      method: 'POST',
      ...extract(args, [], ['pk'])
    })
  },
  '用户@【废弃】我的黑科技|创建'(args: {
    /**
     * @description 黑科技标题
     * @example 这是黑科技标题
     */
    title: number | boolean | string
    /**
     * @description 黑科技介绍
     * @example 这是黑科技介绍
     */
    description: number | boolean | string
    /**
     * @description 海报 上传接口返回的unique_name
     */
    cover: number | boolean | string
    /**
     * @description 调/api/web/v1/organization/?slug=tech
     * @example 1
     */
    organization_id: number | boolean | string
    /**
     * @description 视屏上传接口返回的unique_name
     * @example asdfsa.mp4
     */
    video: number | boolean | string
    /**
     * @description 黑科技所属板块接口（area_name）
     */
    belong_region: number | boolean | string
    /**
     * @description 联系人或商家信息
     * @example 联系人
     */
    business_name?: number | boolean | string
    /**
     * @description 手机号
     * @example 13000000000
     */
    phone?: number | boolean | string
    /**
     * @description 邮箱
     * @example 123456@qq.com
     */
    email?: number | boolean | string
    /**
     * @description 企业qq
     */
    qq?: number | boolean | string
    /**
     * @description logo  上传接口返回的unique_name或url
     */
    logo?: number | boolean | string
    /**
     * @description 附件 上传接口返回的unique_name或url， 多个附件以&quot;,&quot;隔开（&quot;a3000efbf86c0f395427646d5a251908.jpg,025e32ae4a2355becbedb52adc30d3b4.png,bfdc8139a2a8fb41aa0bbd8f76c9bfca.png&quot;）
     */
    enclosure?: number | boolean | string
    /**
     * @description 企业介绍
     */
    business_description?: number | boolean | string
    /**
     * @description 企业所在地
     */
    address?: number | boolean | string
    /**
     * @description 企业联系人
     */
    contacts?: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/user/tech/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '用户@[废弃]我的黑科技详情'(args: {
    /**
     * @description 黑科技id
     * @example 1
     */
    pk: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 黑科技id
         */
        id: number
        /**
         * @description 视频封面
         */
        cover: string
        /**
         * @description 视频地址
         */
        video: string
        /**
         * @description 黑科技标题
         */
        title: string
        /**
         * @description 黑科技描述
         */
        description: string
        /**
         * @description 黑科技分类名
         */
        organization_name: string
        /**
         * @description 分类slug
         */
        organization_slug: string
        /**
         * @description 商户名
         */
        business_name: string
        /**
         * @description 公司描述
         */
        business_description: string
        /**
         * @description 手机号
         */
        phone: string
        email: string
        /**
         * @description 审核状态
         */
        status: string
        /**
         * @description 拒绝原因
         */
        deny_reason: string
        /**
         * @description 点赞数
         */
        counter_value: number
        /**
         * @description 是否点赞
         */
        zaned: boolean
        /**
         * @description 公司联系人
         */
        contacts: string
        /**
         * @description 腾讯会议号
         */
        qq: string
        /**
         * @description 联系人
         */
        field_25: string
        /**
         * @description 所属区
         */
        belong_region: string
        /**
         * @description 公司logo
         */
        logo: string
        /**
         * @description 附件
         */
        enclosure: string[]
      }
    }>({
      url: replacePath('/user/tech/{pk}/', args),
      method: 'GET',
      ...extract(args, [], ['pk'])
    })
  },
  '用户@[废弃]所属板块接口'(args?: any) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        results: {
          id: number
          /**
           * @description 所属版块名
           */
          area_name: string
        }[]
      }
    }>({
      url: replacePath('/region/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },

  '忘记密码@忘记密码发送验证码'(args: {
    /**
     * @example 123456@qq.com
     */
    email: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/forget-password/send-email/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '忘记密码@忘记密码设置密码'(args: {
    email: number | boolean | string
    password: number | boolean | string
    /**
     * @description 4至6位数字
     */
    code: number | boolean | string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {}
    }>({
      url: replacePath('/forget-password/set-password/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },

  '评论@活动评论|发表评论【废弃】'(args: {
    /**
     * @description 日程直播ID
     * @example id=10
     */
    id: number | boolean | string
    /**
     * @description 评论内容
     * @example content=姚老师讲得很精彩
     */
    content: number | boolean | string
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误堆栈
       */
      err_message: string
      /**
       * @description 错误提示
       */
      message: string
      /**
       * @description 返回内容
       */
      data?: {
        /**
         * @description 评论ID
         */
        id: number
        /**
         * @description 用户信息
         */
        user?: {
          /**
           * @description 用户ID
           */
          id: string
          /**
           * @description 用户名
           */
          username: string
          /**
           * @description 用户头像
           */
          avatar: string
        }
        /**
         * @description 父级评论，一级评论为nul
         */
        parent?: {
          /**
           * @description 父级评论ID
           */
          id: string
          /**
           * @description 用户信息，参考上面
           */
          user: {}
          /**
           * @description 评论内容
           */
          content: string
          /**
           * @description 创建时间
           */
          created: string
        }
        /**
         * @description 评论内容
         */
        content: string
        /**
         * @description 自评论数量（主要是一级评论下的二级以及以上的数量）
         */
        children_count: string
        /**
         * @description 缓存的评论内容
         */
        children: {}[]
      }
    }>({
      url: replacePath('/comment/schedule/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '评论@评论|时间盒子发表评论'(args: { id: string; content: string }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        user?: {
          id?: number
          username?: string
          avatar?: string
          nickname?: string
        }
        parent?: any
        content?: string
        children_count?: number
        children?: string[]
        created?: string
      }
    }>({
      url: replacePath('/comment/timebox', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '评论@评论|时间盒子评论列表'(args: {
    /**
     * @description 时间盒子ID
     */
    id: any
    /**
     * @description 父级评论ID，没有可以不提交
     */
    parent_id?: any
    /**
     * @description 每一页数量
     */
    limit?: any
    /**
     * @description 偏移量
     */
    offset?: any
    /**
     * @description 反序排 ordering=-created， 正序排 ordering=created，默认反序
     * @example ordering=created
     */
    ordering?: any
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误堆栈
       */
      err_message: string
      /**
       * @description 错误提示
       */
      message: string
      /**
       * @description 返回内容
       */
      data?: {
        /**
         * @description 评论总数
         */
        count: number
        /**
         * @description 上一页数据
         */
        previous: string
        /**
         * @description 下一页数据
         */
        next: string
        /**
         * @description 返回结果
         */
        results: {
          /**
           * @description 评论ID
           */
          id: number
          /**
           * @description 用户信息
           */
          user: {}
          /**
           * @description 父级评论信息
           */
          parent?: {
            /**
             * @description 父级评论ID
             */
            id: number
            /**
             * @description 用户信息
             */
            user?: {
              /**
               * @description 用户ID
               */
              id: number
              /**
               * @description 用户名
               */
              username: string
              /**
               * @description 头像地址
               */
              avatar: string
            }
            /**
             * @description 评论内容
             */
            content: string
            /**
             * @description 发表评论时间
             */
            created: string
          }
          /**
           * @description 评论内容
           */
          content: string
          /**
           * @description 发表评论时间
           */
          created: string
          /**
           * @description 子评论个数
           */
          children_count: string
          /**
           * @description 缓存子评论，一般有限几条
           */
          children: {
            /**
             * @description 评论ID
             */
            id: string
            /**
             * @description 用户信息
             */
            user?: {
              /**
               * @description 用户ID
               */
              id: string
              /**
               * @description 用户名
               */
              username: string
              /**
               * @description 用户头像
               */
              avatar: string
            }
            parent?: {
              /**
               * @description 评论ID
               */
              id: number
              user?: {
                /**
                 * @description 用户ID
                 */
                id: string
                /**
                 * @description 用户名
                 */
                username: string
                /**
                 * @description 头像
                 */
                avatar: string
              }
              /**
               * @description 内容
               */
              content: string
              /**
               * @description 创建时间
               */
              created: string
            }
          }[]
        }[]
      }
    }>({
      url: replacePath('/comment/timebox', args),
      method: 'GET',
      ...extract(args, ['id', 'parent_id', 'limit', 'offset', 'ordering'], [])
    })
  },
  '评论@评论|评论列表【废弃】'(args: {
    /**
     * @description 日程ID
     */
    id: any
    /**
     * @description 父级评论ID，没有可以不提交
     */
    parent_id?: any
    /**
     * @description 每一页数量
     */
    limit?: any
    /**
     * @description 偏移量
     */
    offset?: any
    /**
     * @description 反序排 ordering=-created， 正序排 ordering=created，默认反序
     * @example ordering=created
     */
    ordering?: any
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误堆栈
       */
      err_message: string
      /**
       * @description 错误提示
       */
      message: string
      /**
       * @description 返回内容
       */
      data?: {
        /**
         * @description 评论总数
         */
        count: number
        /**
         * @description 上一页数据
         */
        previous: string
        /**
         * @description 下一页数据
         */
        next: string
        /**
         * @description 返回结果
         */
        results: {
          /**
           * @description 评论ID
           */
          id: number
          /**
           * @description 用户信息
           */
          user: {}
          /**
           * @description 父级评论信息
           */
          parent?: {
            /**
             * @description 父级评论ID
             */
            id: number
            /**
             * @description 用户信息
             */
            user?: {
              /**
               * @description 用户ID
               */
              id: number
              /**
               * @description 用户名
               */
              username: string
              /**
               * @description 头像地址
               */
              avatar: string
            }
            /**
             * @description 评论内容
             */
            content: string
            /**
             * @description 发表评论时间
             */
            created: string
          }
          /**
           * @description 评论内容
           */
          content: string
          /**
           * @description 发表评论时间
           */
          created: string
          /**
           * @description 子评论个数
           */
          children_count: string
          /**
           * @description 缓存子评论，一般有限几条
           */
          children: {
            /**
             * @description 评论ID
             */
            id: string
            /**
             * @description 用户信息
             */
            user?: {
              /**
               * @description 用户ID
               */
              id: string
              /**
               * @description 用户名
               */
              username: string
              /**
               * @description 用户头像
               */
              avatar: string
            }
            parent?: {
              /**
               * @description 评论ID
               */
              id: number
              user?: {
                /**
                 * @description 用户ID
                 */
                id: string
                /**
                 * @description 用户名
                 */
                username: string
                /**
                 * @description 头像
                 */
                avatar: string
              }
              /**
               * @description 内容
               */
              content: string
              /**
               * @description 创建时间
               */
              created: string
            }
          }[]
        }[]
      }
    }>({
      url: replacePath('/comment/schedule/', args),
      method: 'GET',
      ...extract(args, ['id', 'parent_id', 'limit', 'offset', 'ordering'], [])
    })
  },

  '分场活动@分场活动换一换'(args: { id: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          title: string
          start: any
          end: any
          description: any
          guest: string
          guest_profile: string
          live: any
          m3u8: string
          flv: string
          cover: string
          video: string
          video_type: string
        }[]
      }
    }>({
      url: replacePath('/schedule-refresh', args),
      method: 'GET',
      ...extract(args, ['id'], [])
    })
  },
  '分场活动@分场活动详情'(args: {
    /**
     * @description 活动会议id
     * @example 1
     */
    pk: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        title?: string
        guest?: string
        guest_profile?: string
        start?: string
        end?: string
        cover?: string
        live?: any
        video?: string[]
        day?: string
        video_type?: string
        timeslot?: any
        description?: string
        author?: any
        appointed?: boolean
        categorys?: {
          slug: string
          name: string
        }[]
        m3u8?: string[]
        tags?: {
          slug?: string
          name?: string
        }[]
        online_number?: number
        live_status?: string
        hall_name?: string
        can_appointment?: boolean
        zan_count?: any
        zaned?: boolean
        flv?: string[]
        vod_id?: any
      }
    }>({
      url: replacePath('/schedule/{pk}/', args),
      method: 'GET',
      ...extract(args, [], ['pk'])
    })
  },
  '分场活动@活动评审嘉宾'(args: {
    /**
     * @description schedule 的 id
     * @example 1
     */
    pk: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        results?: {
          /**
           * @description 评委名
           */
          username: string
          /**
           * @description 评委照片
           */
          photo: string
          /**
           * @description 评委简介
           */
          biref: string
          /**
           * @description 评委详细介绍
           */
          description: string
          /**
           * @description ID
           */
          id: number
        }[]
        count: string
        next: string
        previous: string
      }
    }>({
      url: replacePath('/schedule/{pk}/guest/', args),
      method: 'GET',
      ...extract(args, [], ['pk'])
    })
  },
  '分场活动@直播推荐'(args: {
    /**
     * @description 每页数据量
     */
    limit?: any
    /**
     * @description 起始页码
     */
    offset?: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        results: {
          /**
           * @description id
           */
          id: number
          /**
           * @description 开始时间
           */
          start: string
          /**
           * @description 结束时间
           */
          end: string
          /**
           * @description 标题
           */
          title: string
          /**
           * @description 描述
           */
          description: string
          /**
           * @description 嘉宾
           */
          guest: string
          /**
           * @description 嘉宾描述
           */
          guest_profile: string
          /**
           * @description 直播流地址
           */
          live: string
          /**
           * @description 封面图
           */
          cover: string
          /**
           * @description 视屏流地址
           */
          video: string
          /**
           * @description 直播状态（waiting： 未开始， ing：正在直播，end:结束）
           */
          activity_status: string
          /**
           * @description 点赞数
           */
          zan_count: number
          /**
           * @description 是否已点赞
           */
          zaned: boolean
          /**
           * @description 在线人数
           */
          online_number: number
        }[]
        /**
         * @description 总数
         */
        count: number
        /**
         * @description 下一页链接
         */
        next: string
        /**
         * @description 上一页链接
         */
        previous: string
      }
    }>({
      url: replacePath('/schedule/recommend/', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset'], [])
    })
  },
  '分场活动@紫金山创新大会-开幕式详情'(args?: any) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 日程ID
         */
        id: string
        /**
         * @description 开始时间
         */
        start: string
        /**
         * @description 结束时间
         */
        end: string
        /**
         * @description 标题
         */
        title: string
        /**
         * @description 描述
         */
        description: string
        /**
         * @description 嘉宾
         */
        guest: string
        /**
         * @description 嘉宾描述
         */
        guest_profile: string
        /**
         * @description 直播链接
         */
        live: string
        /**
         * @description flv流地址
         */
        flv: string
        /**
         * @description m3u8流地址
         */
        m3u8: string
        /**
         * @description 封面URL
         */
        cover: string
        /**
         * @description 回看链接
         */
        video: string
        /**
         * @description 视频类型
         */
        video_type: string
        /**
         * @description 是否已预约
         */
        appointed: string
        /**
         * @description 是否可预约
         */
        can_appointment: string
      }
    }>({
      url: replacePath('/schedule/open-ceremony/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '分场活动@非直播活动'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        results?: {
          id: number
          name: string
          schedule: {
            id?: number
            title?: string
            category?: string
            place?: string[]
            organizer?: string[]
          }[]
        }[]
      }
    }>({
      url: replacePath('/schedule-nonlive', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '分场活动@颁奖盛典-闭幕式详情'(args?: any) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 日程ID
         */
        id: string
        /**
         * @description 开始时间
         */
        start: string
        /**
         * @description 结束时间
         */
        end: string
        /**
         * @description 标题
         */
        title: string
        /**
         * @description 描述
         */
        description: string
        /**
         * @description 嘉宾
         */
        guest: string
        /**
         * @description 嘉宾描述
         */
        guest_profile: string
        /**
         * @description 直播链接
         */
        live: string
        /**
         * @description flv直播链接
         */
        flv: string
        /**
         * @description m3u8直播链接
         */
        m3u8: string
        /**
         * @description 封面URL
         */
        cover: string
        /**
         * @description 回看链接
         */
        video: string
        /**
         * @description 视频类型
         */
        video_type: string
        /**
         * @description 是否已预约
         */
        appointed: string
        /**
         * @description 是否可预约
         */
        can_appointment: string
      }
    }>({
      url: replacePath('/schedule/closing-ceremony/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '分场活动@首页|活动日程列表'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        results?: {
          time: string
          title: string
          hall: {
            name: string
            am: {
              id: number
              title: string
              start: string
              end: string
              description: string
              guest: string
              guest_profile: string
              live: any
              m3u8: string[]
              flv: string[]
              cover: string
              video: string[]
              video_type: string
            }[]
            pm: {
              id?: number
              title?: string
              start?: string
              end?: string
              description?: string
              guest?: string
              guest_profile?: string
              live?: any
              m3u8?: any
              flv?: any
              cover?: string
              video?: any
              video_type?: string
            }[]
          }[]
          description: string
          image_url: string
          subtitle: string
          h5_description: string
        }[]
      }
    }>({
      url: replacePath('/schedule', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },

  '点赞模块@点赞模块|取消点赞'(
    args: {
      /**
       * @example slug=schedule
       */
      slug: any
    } & {
      /**
       * @description 点赞视频ID
       * @example id=10
       */
      id: number | boolean | string
      kind: number | boolean | string
    }
  ) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data: {}
    }>({
      url: replacePath('/zan/{slug}/', args),
      method: 'DELETE',
      ...extract(args, [], ['slug'])
    })
  },
  '点赞模块@点赞模块|点赞'(
    args: {
      /**
  * @description schedule 分场活动
content  创美丽古都
forum 论坛活动
news  新闻
company 五名
visit 主宾国主宾城市
   * @example slug=schedule
  */
      slug: any
    } & {
      /**
       * @description 点赞视频ID
       * @example 10
       */
      id: number | boolean | string
      /**
  * @description video 视频
image 图集
activity 论坛活动
   * @example video
  */
      kind: number | boolean | string
    }
  ) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data: {}
    }>({
      url: replacePath('/zan/{slug}/', args),
      method: 'POST',
      ...extract(args, [], ['slug'])
    })
  },

  '（弃用）投票@投票'(args: {
    /**
     * @description HostVote, TopicVote, GuestPK(同内容接口， 但必填)
     * @example HostVote
     */
    event: number | boolean | string
    /**
     * @description 投票对象id
     * @example 1
     */
    module_id: number | boolean | string
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data: {}
    }>({
      url: replacePath('/vote/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '（弃用）投票@投票模块内容'(args: {
    /**
     * @description HostVote:主持人投票, TopicVote:话题投票, GuestPK:嘉宾投票（默认HostVote）
     * @example HostVote
     */
    event?: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 投票模块类别
         */
        event: string
        /**
         * @description 投票选项列表
         */
        vote_meta: {
          /**
           * @description 投票选项id
           */
          id: number
          /**
           * @description 名称
           */
          name: string
          /**
           * @description 描述
           */
          description: string
          /**
           * @description 封面
           */
          cover: string
          /**
           * @description 是否已投票
           */
          voted: boolean
          /**
           * @description 获得票数
           */
          voted_value: number
        }[]
        /**
         * @description 投票开始时间
         */
        start: string
        /**
         * @description 投票结束时间
         */
        end: string
      }
    }>({
      url: replacePath('/vote', args),
      method: 'GET',
      ...extract(args, ['event'], [])
    })
  },

  '商城@创新币|商品列表'(args: {
    /**
     * @description 商品分类slug;  商品分类由后台创建的商品分类决定。
     * @example 手办
     */
    slug?: any
    /**
     * @description 偏移量
     * @example 0
     */
    offset?: any
    /**
     * @description 每页数量
     * @example 10
     */
    limit?: any
    /**
     * @description 是否换一换，默认排序为低价格和高库存量优先
     * @example 1
     */
    is_random?: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 总数
         */
        count: number
        /**
         * @description 下一页数据接口
         */
        next: string
        /**
         * @description 上一页数据接口
         */
        previous: string
        /**
         * @description 返回结果
         */
        results: {
          /**
           * @description 商品ID
           */
          id: string
          /**
           * @description 商品名
           */
          name: string
          /**
           * @description 过期时间
           */
          expired: string
          /**
           * @description 价格
           */
          price: string
          /**
           * @description 图片链接
           */
          image: string
          /**
           * @description 库存
           */
          stock: string
          /**
           * @description 商品描述
           */
          description: string
          /**
           * @description 地址
           */
          address: string
          /**
           * @description 兑换规则介绍
           */
          regulation: string
        }[]
      }
    }>({
      url: replacePath('/product/', args),
      method: 'GET',
      ...extract(args, ['slug', 'offset', 'limit', 'is_random'], [])
    })
  },
  '商城@抽奖配置'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        result?: {
          is_open?: boolean
          rules?: {
            id: number
            is_deleted: boolean
            deleted_at: any
            sequence: number
            name: string
            is_active: boolean
            category: string
            content: string
            description: string
          }[]
        }
      }
    }>({
      url: replacePath('/lotteryconf', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '商城@抽奖'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        status?: string
        result?: {
          id?: number
          image_lst?: any
          is_deleted?: boolean
          deleted_at?: any
          sequence?: number
          name?: string
          image?: string
          price?: number
          stock?: number
          expired?: any
          address?: string
          regulation?: string
          description?: string
          category?: number
          is_send?: boolean
        }
      }
    }>({
      url: replacePath('/lottery', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '商城@创新币|事件规则'(args: {
    /**
     * @description 偏移量
     * @example offset=0
     */
    offset?: any
    /**
     * @description 每页数量
     * @example 10
     */
    limit: any
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          sequence: number
          start: string
          end: string
          event: string
          module: string
          module_name_cn: string
          cate: string
          definition: number
          points: number
          unit: string
          unit_number: number
          active: boolean
        }[]
      }
    }>({
      url: replacePath('/eventrule', args),
      method: 'GET',
      ...extract(args, ['offset', 'limit'], [])
    })
  },
  '商城@中奖交易'(args: {
    /**
     * @description 商品ID
     */
    product_id: number
    /**
     * @description 数量
     */
    number?: number
    /**
     * @description 收货用户地址
     */
    address: string
    /**
     * @description 收货用户联系方式
     */
    phone: string
    /**
     * @description 收货用户名称
     */
    contact: string
  }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        id?: number
        product_id?: string
        name?: string
        image?: string
        expired?: any
        price?: string
        address_meta?: {
          address?: string
          contact?: string
          phone?: string
        }
        created?: string
        modified?: string
        uuid?: string
        number?: number
        exchanged_at?: string
        product?: number
        user?: number
      }
    }>({
      url: replacePath('/lotteryexchange', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '商城@中奖剩余次数'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        result?: {
          left_times?: number
        }
      }
    }>({
      url: replacePath('/lotteryleft', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '商城@创新币|商品分类列表'(args: {
    /**
     * @description 偏移量
     * @example 0
     */
    offset?: any
    /**
     * @description 每页数量
     * @example 10
     */
    limit?: any
  }) {
    return requestAdapter<any>({
      url: replacePath('/product/category', args),
      method: 'GET',
      ...extract(args, ['offset', 'limit'], [])
    })
  },
  '商城@创新币|兑换商品'(args: {
    /**
     * @description 商品列表中拿到的商品ID
     * @example 1
     */
    product_id: number | boolean | string
    /**
     * @description 收货地址联系人
     * @example JSDu
     */
    contact: number | boolean | string
    /**
     * @description 收货地址联系方式
     * @example 17600482090
     */
    phone: number | boolean | string
    /**
     * @description 收货地址
     * @example 南京市紫东创意园C21
     */
    address: number | boolean | string
    /**
     * @description 兑换数量
     * @example 1
     */
    number?: number | boolean | string
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 兑换实体ID
         */
        id: string
        /**
         * @description 商品名
         */
        name: string
        /**
         * @description 兑换码
         */
        code: string
        /**
         * @description 过期时间
         */
        expired: string
        /**
         * @description 价格
         */
        price: string
        /**
         * @description 图片链接
         */
        image: string
        /**
         * @description 兑换时间
         */
        exchanged_at: string
        /**
         * @description 商品ID
         */
        product_id: string
        /**
         * @description 用户收货地址元信息
         */
        address_meta?: {
          /**
           * @description 收货地址
           */
          address: string
          /**
           * @description 联系人
           */
          contact: string
          /**
           * @description 联系电话
           */
          phone: string
        }
      }
      /**
       * @description 用户-商品购买记录uuid
       */
      uuid: string
    }>({
      url: replacePath('/product/exchange/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '商城@创新币|用户运单记录列表'(args: {
    /**
     * @description 偏移量
     * @example offset=0
     */
    offset?: any
    /**
     * @description 每页数量
     * @example limit=10
     */
    limit?: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 总数
         */
        count: number
        /**
         * @description 下一页数据接口
         */
        next: string
        /**
         * @description 上一页数据接口
         */
        previous: string
        /**
         * @description 返回结果
         */
        results: {
          /**
           * @description 用户运单内部ID
           */
          id: string
          /**
           * @description 运单状态     not_shipped = &quot;not_shipped&quot;     shipped = &quot;shipped&quot;     STATE_CHOICE = (         (not_shipped, &quot;未发货&quot;),         (shipped, &quot;已发货&quot;),     )
           */
          status: string
          /**
           * @description 用户信息
           */
          user?: {
            /**
             * @description 用户id
             */
            id: string
            /**
             * @description 用户名
             */
            username: string
            /**
             * @description 用户类型
             */
            user_cate: string
            /**
             * @description 用户电话
             */
            phone: string
            /**
             * @description 用户创新币余额
             */
            balance: string
            /**
             * @description 用户消耗创新币数量
             */
            cost: string
            /**
             * @description token
             */
            token: string
          }
          /**
           * @description 实际接入运输商运单号【暂时无用】
           */
          qaybill: string
          /**
           * @description 实际接入运输商运单元信息【暂时无用】
           */
          meta: string
          /**
           * @description 发货时间
           */
          send_at: string
          /**
           * @description 发货地址元信息
           */
          address_meta?: {
            /**
             * @description 收货地址
             */
            address: string
            /**
             * @description 收货联系人
             */
            contact: string
            /**
             * @description 收货联系人电话
             */
            phone: string
          }
          /**
           * @description 商品交易元数据
           */
          exchange: {}
          /**
           * @description 运单uuid 方便前端进行展示为订单号
           */
          uuid: string
        }[]
      }
    }>({
      url: replacePath('/user/logistics/', args),
      method: 'GET',
      ...extract(args, ['offset', 'limit'], [])
    })
  },
  '商城@创新币|用户运单详情记录'(
    args: {
      /**
       * @description 用户运单记录内部id
       */
      pk: any
    } & {
      /**
       * @description 偏移量
       * @example offset=0
       */
      offset?: any
      /**
       * @description 每页数量
       * @example limit=10
       */
      limit?: any
    }
  ) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 运单内部id
         */
        id: string
        /**
         * @description 运单uuid 方便前端进行展示为订单号
         */
        uuid: string
        /**
         * @description 用户信息
         */
        user: {}
        /**
         * @description 用户货品交易信息
         */
        exchange: {}
        /**
         * @description 实际接入运输商运单号【暂时无用】
         */
        qaybill: string
        /**
         * @description 实际接入运输商运单元信息【暂时无用】
         */
        meta: string
        /**
         * @description 发货时间
         */
        send_at: string
        /**
         * @description 发货地址元信息
         */
        address_meta?: {
          /**
           * @description 收货地址
           */
          address: string
          /**
           * @description 收货联系人
           */
          contact: string
          /**
           * @description 收货联系人电话
           */
          phone: string
        }
      }
    }>({
      url: replacePath('/user/logistics/{pk}', args),
      method: 'GET',
      ...extract(args, ['offset', 'limit'], ['pk'])
    })
  },
  '商城@创新币|商品详情'(args: {
    /**
     * @description 商品详情
     * @example id=1
     */
    id: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 商品ID
         */
        id: string
        /**
         * @description 商品名
         */
        name: string
        /**
         * @description 过期时间
         */
        expired: string
        /**
         * @description 价格
         */
        price: string
        /**
         * @description 图片链接
         */
        image: string
        /**
         * @description 库存
         */
        stock: string
        /**
         * @description 商品描述
         */
        description: string
        /**
         * @description 地址
         */
        address: string
        /**
         * @description 兑换说明
         */
        regulation: string
        /**
         * @description 是否可兑换
         */
        can_exchange: boolean
      }
    }>({
      url: replacePath('/product/{id}/', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },
  '商城@创新币|钱包交易明细'(args: {
    /**
     * @description 偏移量
     * @example offset=0
     */
    offset?: any
    /**
     * @description 每页数量
     * @example 10
     */
    limit: any
    /**
  * @description 使用event_type的枚举类型；通过event_rule接口返回的事件规则枚举 Comment
Zan
UserRegister
Appointment
UserVote
WeiXinProgramShare
CreateTimeBox
OpenTimeBox
ContentOrganizationTech
ProductExchange
OpenNotStartTimeBox
   * @example ProductExchange
  */
    event_type?: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 明细ID
         */
        id: string
        /**
         * @description 交易类型 Comment 评论 | Appointment 预约 |  Zan 点赞 | ProductExchange 商品兑换 | User 用户注册
         */
        module: string
        /**
         * @description 业务数据需要自取，每种业务的数据可能不一样，参考示例数据
         */
        meta?: {
          /**
           * @description 业务ID，如果是评论，即是评论ID
           */
          id: string
          /**
           * @description 以评论为例，评论对象的module
           */
          module: string
          /**
           * @description 评论对象的ID
           */
          module_id: string
          /**
           * @description 条目创建时间
           */
          created: string
        }
        /**
         * @description 钱包事件类型字段；枚举值。
         */
        event_type: string
      }
    }>({
      url: replacePath('/user/wallet-transaction/', args),
      method: 'GET',
      ...extract(args, ['offset', 'limit', 'event_type'], [])
    })
  },
  '商城@【废弃】收货地址|展示我的地址列表'(args?: any) {
    return requestAdapter<any>({
      url: replacePath('/user/address/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '商城@【废弃】收货地址|创建我的地址'(
    args: {
      id: any
    } & {
      /**
       * @description 收货联系地址
       * @example 收货联系地址
       */
      address: number | boolean | string
      /**
       * @description 收货联系人
       * @example 收货联系人
       */
      phone: number | boolean | string
      /**
       * @description 是否为默认地址
       * @example true|false
       */
      is_default: number | boolean | string
    }
  ) {
    return requestAdapter<any>({
      url: replacePath('/user/address/{id}', args),
      method: 'POST',
      ...extract(args, [], ['id'])
    })
  },
  '商城@【废弃】收货地址|修改我的地址'(
    args: {
      id: any
    } & {
      /**
       * @description 收货联系地址
       * @example 收货联系地址
       */
      address: number | boolean | string
      /**
       * @description 收货联系人
       * @example 收货联系人
       */
      phone: number | boolean | string
      /**
       * @description 是否为默认地址
       * @example true|false
       */
      is_default: number | boolean | string
    }
  ) {
    return requestAdapter<any>({
      url: replacePath('/user/address/{id}', args),
      method: 'PUT',
      ...extract(args, [], ['id'])
    })
  },
  '商城@【废弃】创新币|商品兑换记录列表_copy'(args: {
    /**
     * @description 偏移量
     * @example offset=0
     */
    offset?: any
    /**
     * @description 每页数量
     * @example limit=10
     */
    limit?: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        /**
         * @description 总数
         */
        count: number
        /**
         * @description 下一页数据接口
         */
        next: string
        /**
         * @description 上一页数据接口
         */
        previous: string
        /**
         * @description 返回结果
         */
        results: {
          /**
           * @description 兑换实体ID
           */
          id: string
          /**
           * @description 商品名
           */
          name: string
          /**
           * @description 兑换码
           */
          code: string
          /**
           * @description 过期时间
           */
          expired: string
          /**
           * @description 价格
           */
          price: string
          /**
           * @description 图片链接
           */
          image: string
          /**
           * @description 兑换时间
           */
          exchanged_at: string
          /**
           * @description 商品ID
           */
          product_id: string
          address_meta?: {
            /**
             * @description 收货地址
             */
            address: string
            /**
             * @description 联系人
             */
            contact: string
            /**
             * @description 联系电话
             */
            phone: string
          }
          /**
           * @description 用户-商品购买记录uuid
           */
          uuid: string
        }[]
      }
    }>({
      url: replacePath('/product/exchange/_1622457993745', args),
      method: 'GET',
      ...extract(args, ['offset', 'limit'], [])
    })
  },

  '新闻@一周大事记'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        results?: {
          news: {
            id: number
            title: string
            publish_at: string
            source: string
            authors: string
            category: string
            subtitle: any
            views: number
            feature_url: string
            start_date: string
            end_date: string
          }[]
          month: number
          year: number
        }[]
      }
    }>({
      url: replacePath('/week-news', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '新闻@图片新闻列表'(args: {
    /**
     * @description 每页数据个数，默认值20
     * @example limit=10
     */
    limit?: any
    /**
     * @description 获取数据起始位置（偏移量）默认是0，也就是会从第一条数据开始取
     * @example offset=0
     */
    offset?: any
    /**
  * @description 内容类型
news 新闻
report 大会公告
media-report 媒体报道

支持传多个分类，以半角逗号隔开就行
例如同时拿新闻和公告
category=news,report
   * @example cate=report
  */
    category?: any
    /**
     * @description 是否在首页展示，0 不展示， 1 展示，默认是0 不展示
     * @example is_index=0
     */
    is_index?: any
    /**
     * @description 图片新闻标题搜索
     * @example search=搜索
     */
    search?: any
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      message: string
      /**
       * @description 后台错误简略堆栈
       */
      err_message: string
      /**
       * @description 返回数据
       */
      data?: {
        /**
         * @description 总数
         */
        count: number
        /**
         * @description 下一页接口地址
         */
        next: string
        /**
         * @description 上一页接口地址
         */
        previous: string
        results: {
          /**
           * @description 新闻标题
           */
          title: string
          /**
           * @description 新闻ID
           */
          id: number
          /**
           * @description 新闻来源
           */
          source: string
          /**
           * @description 新闻发布时间
           */
          publish_at: string
          /**
           * @description 视频地址
           */
          images_url: string[]
        }[]
      }
    }>({
      url: replacePath('/image-news/', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset', 'category', 'is_index', 'search'], [])
    })
  },
  '新闻@图片新闻详情'(args: {
    /**
     * @description 字段ID
     * @example pk=1
     */
    pk: any
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      message: string
      /**
       * @description 后台错误简略堆栈
       */
      err_message: string
      data?: {
        /**
         * @description 新闻标题
         */
        title: string
        /**
         * @description 新闻ID
         */
        id: number
        /**
         * @description 新闻来源
         */
        source: string
        /**
         * @description 新闻发布时间
         */
        publish_at: string
        /**
         * @description 视频地址
         */
        images_url: string[]
      }
    }>({
      url: replacePath('/image-news/{pk}/', args),
      method: 'GET',
      ...extract(args, [], ['pk'])
    })
  },
  '新闻@新闻分类'(args?: any) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          name: string
          en_name: string
        }[]
      }
    }>({
      url: replacePath('/news-category', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '新闻@新闻列表'(args: {
    /**
     * @example offset=0
     */
    offset?: any
    /**
     * @description 获取数量
     * @example limit=10
     */
    limit?: any
    /**
     * @description 是否在首页展示，0 不展示， 1 展示，默认是0 不展示
     * @example is_index=0
     */
    is_index?: any
    /**
  * @description 内容类型
news 新闻
report 大会公告
media-report 媒体报道

支持传多个分类，以半角逗号隔开就行
例如同时拿新闻和公告
category=news,report
   * @example category
  */
    category?: any
    /**
     * @description 是否精选 1 是 0 否
     * @example is_refined=1
     */
    is_refined?: any
    /**
     * @description 模糊搜索
     * @example search=科技
     */
    search?: any
    /**
     * @description 按某个字段排序，需要把字段传入，例如，按发布时间正序，publish_at,按发布时间倒序，-publish_at
     * @example ordering=-publish_at
     */
    ordering?: any
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      message: string
      /**
       * @description 后台错误简略堆栈
       */
      err_message: string
      /**
       * @description 返回数据
       */
      data?: {
        /**
         * @description 总数
         */
        count: number
        /**
         * @description 下一页接口地址
         */
        next: string
        /**
         * @description 上一页接口地址
         */
        previous: string
        results: {
          /**
           * @description 新闻详情
           */
          title: string
          /**
           * @description 发布人
           */
          authors: string
          /**
           * @description 发布时间
           */
          publish_at: string
          /**
           * @description 新闻来源
           */
          source: string
          /**
           * @description 新闻图片封面
           */
          feature_url: string
          /**
           * @description 新闻内容
           */
          content: string
          /**
           * @description 新闻ID
           */
          id: string
          /**
           * @description 新闻分类
           */
          category: string
        }[]
      }
    }>({
      url: replacePath('/news/', args),
      method: 'GET',
      ...extract(
        args,
        ['offset', 'limit', 'is_index', 'category', 'is_refined', 'search', 'ordering'],
        []
      )
    })
  },
  '新闻@新闻换一换'(args: { category?: any; is_index?: any; is_refined?: any; id?: any }) {
    return requestAdapter<{
      err_code?: string
      message?: string
      err_message?: string
      data?: {
        count?: number
        next?: any
        previous?: any
        results?: {
          id: number
          title: string
          publish_at: string
          source: string
          authors: string
          category: string
          subtitle: string
          views: number
          feature_url: string
          start_date: any
          end_date: any
        }[]
      }
    }>({
      url: replacePath('/news-refresh', args),
      method: 'GET',
      ...extract(args, ['category', 'is_index', 'is_refined', 'id'], [])
    })
  },
  '新闻@新闻详情'(args: { id: any }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      message: string
      /**
       * @description 后台错误简略堆栈
       */
      err_message: string
      /**
       * @description 返回数据
       */
      data?: {
        /**
         * @description 新闻详情
         */
        title: string
        /**
         * @description 新闻ID
         */
        id: string
        /**
         * @description 新闻内容
         */
        content: string
        /**
         * @description 发布时间
         */
        publish_at: string
        /**
         * @description 新闻来源
         */
        source: string
        /**
         * @description 发布人
         */
        authors: string
      }
    }>({
      url: replacePath('/news/{id}/', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },
  '新闻@视频新闻列表'(args: {
    /**
     * @description 每页数据个数，默认值20
     * @example limit=10
     */
    limit?: any
    /**
     * @description 获取数据起始位置（偏移量）默认是0，也就是会从第一条数据开始取
     * @example offset=0
     */
    offset?: any
    /**
     * @description 内容类型 news 新闻 report 大会公告
     * @example cate=report
     */
    category?: any
    /**
     * @description 是否在首页展示，0 不展示， 1 展示，默认是0 不展示
     * @example is_index=0
     */
    is_index?: any
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      message: string
      /**
       * @description 后台错误简略堆栈
       */
      err_message: string
      /**
       * @description 返回数据
       */
      data?: {
        /**
         * @description 总数
         */
        count: number
        /**
         * @description 下一页接口地址
         */
        next: string
        /**
         * @description 上一页接口地址
         */
        previous: string
        results: {
          /**
           * @description 新闻标题
           */
          title: string
          /**
           * @description 新闻ID
           */
          id: number
          /**
           * @description 新闻来源
           */
          source: string
          /**
           * @description 新闻发布时间
           */
          publish_at: string
          /**
           * @description 视频地址
           */
          videos_url: string[]
          cover: string
          /**
           * @description 类型
           */
          category: string
        }[]
      }
    }>({
      url: replacePath('/video-news/', args),
      method: 'GET',
      ...extract(args, ['limit', 'offset', 'category', 'is_index'], [])
    })
  },

  '嘉宾@嘉宾列表(首页嘉宾轮播以及全部嘉宾列表)'(args: {
    /**
     * @description 是否为重要嘉宾(首页嘉宾轮播传1)（全部嘉宾列表不用传或传空）
     * @example 1或0
     */
    is_import?: any
    limit?: any
    offset?: any
  }) {
    return requestAdapter<{
      err_code: string
      message: string
      err_message: string
      data?: {
        count: number
        next: string
        previous: string
        results: {
          last_name: string
          first_name: string
          photo: string
          /**
           * @description 嘉宾介绍
           */
          introduction: string
          /**
           * @description 嘉宾参会信息
           */
          attending: string
        }[]
      }
    }>({
      url: replacePath('/guest/', args),
      method: 'GET',
      ...extract(args, ['is_import', 'limit', 'offset'], [])
    })
  },

  '统一文件上传@文件上传'(args: {
    /**
     * @description 文件类型，目前支持 image 图片 audio 音频 video 视频 other其他
     * @example cate=image
     */
    cate: number | boolean | string
    /**
     * @description 上传文件实体
     * @example file=&lt;文件&gt;
     */
    file?: File
    /**
     * @description 本地存储（local），上传到OSS上(cdn)  ，现在接口已经支持上传至OSS，此参数设置成cdn即可，storage=cdn
     * @example storage=local
     */
    storage: number | boolean | string
    /**
     * @description 文件标签，支持多个标签，必须拼成字符串，以半角逗号隔开，例如news,activity
     * @example tag=news
     */
    tag?: number | boolean | string
  }) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      messgae: string
      /**
       * @description 错误信息服务器堆栈
       */
      err_message: string
      data?: {
        /**
         * @description 静态文件ID
         */
        id: string
        /**
         * @description 静态文件URL
         */
        url: string
        /**
         * @description 原文件名
         */
        name: string
        /**
         * @description 上传后的文件名
         */
        unique_name: string
      }
    }>({
      url: replacePath('/file-upload/', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '统一文件上传@获取文件上传至阿里云OSS临时TOKEN信息'(args?: any) {
    return requestAdapter<{
      /**
       * @description 错误码
       */
      err_code: string
      /**
       * @description 错误信息
       */
      messgae: string
      /**
       * @description 错误信息服务器堆栈
       */
      err_message: string
      data?: {
        /**
         * @description 请求ID
         */
        RequestId: string
        /**
         * @description 相关角色信息
         */
        AssumedRoleUser: {}
        /**
         * @description 相关上传授权信息
         */
        Credentials: {}
      }
    }>({
      url: replacePath('/file-upload/sts-token/', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },

  'vod@商务合作'(args: {
    name: number | boolean | string
    category: number | boolean | string
    mail?: number | boolean | string
    phone?: number | boolean | string
  }) {
    return requestAdapter<any>({
      url: replacePath('/collaboration', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  'vod@vod'(args: { vod_id: number | boolean | string }) {
    return requestAdapter<{
      data?: {
        vod_id?: string
        vod_info?: string
        auth_info?: string
      }
    }>({
      url: replacePath('/vod-play', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  }
}

export type ServiceKeys = keyof typeof services

export type ServiceArg<T extends ServiceKeys> = Parameters<typeof services[T]>[0]

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

export type ServiceReturn<T extends ServiceKeys> = Awaited<ReturnType<typeof services[T]>>['data']
