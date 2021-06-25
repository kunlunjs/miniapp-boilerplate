import { useCallback, useEffect, useState } from 'react'

type ServiceType<T> = () => Promise<T>

type SetterType<T> = (data: T) => void

type StoreHookType<T> = () => [T, SetterType<T>]

/**
 * 创建一个可缓存的数据
 * @param initialValue 初始值
 * @param service 获取数据的函数
 * @returns 类似useState的返回
 */
function createStoreHook<T>(initialValue: T, service?: ServiceType<T>): StoreHookType<T> {
  let store: T = initialValue
  let initialized = false
  let fetchPromise: Promise<T> | null
  let reactions: Function[] = []

  const setStoreFn = (data: T) => {
    store = data

    // Call reactions
    reactions.forEach(fn => fn())
  }

  const useStoreFn: StoreHookType<T> = () => {
    const [current, setCurrent] = useState<T>(store)

    const reaction = useCallback(() => {
      setCurrent(store)
    }, [])

    useEffect(() => {
      if (service && !initialized && !fetchPromise) {
        const run = async () => {
          const currentFetchPromise = (fetchPromise = fetchPromise ?? service!())
          const data = await currentFetchPromise
          setStoreFn(data)
          fetchPromise = null
          initialized = true
        }

        run()
      }

      reactions.push(reaction)

      return () => {
        reactions = reactions.filter(f => reaction !== f)
      }
    }, [reaction])

    return [current, setStoreFn]
  }

  return useStoreFn
}

export default createStoreHook
