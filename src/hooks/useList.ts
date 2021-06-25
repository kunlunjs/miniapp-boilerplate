import services from '@/services'
import type { ServiceKeys } from '@/services/yapi.service.keys'
import useRequest from '@ahooksjs/use-request'
import { useState } from 'react'

export const defaultPageSize = 20

const noMoreDataRet = { list: [] }

export default function useList(
  serviceKey: ServiceKeys | null,
  obj?: {
    params?: Record<string, unknown>
    manual?: boolean
  }
) {
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const request = useRequest(
    async prevRet => {
      if (!serviceKey) {
        return noMoreDataRet
      }
      if (isFirstLoad) {
        setIsFirstLoad(false)
      }
      const { data, error } = await services[serviceKey]({
        ...(obj?.params ?? {}),
        offset: prevRet?.list.length ?? 0,
        limit: defaultPageSize
      })
      setRefreshing(false)
      if (!error) {
        return { list: data.results, total: data.count }
      } else {
        return noMoreDataRet
      }
    },
    {
      // debounceInterval: 500,
      refreshDeps: [serviceKey, obj?.params],
      loadMore: true,
      isNoMore: ret => (ret ? ret.list.length >= ret.total : false)
      // manual: obj?.manual
    }
  )

  const reload = () => {
    // 防止自动请求的和useDidShow重复请求
    if (!isFirstLoad) {
      request.reload()
      setRefreshing(true)
    }
  }

  return {
    ...request,
    reload,
    refreshing
  }
}
