import { useCallback, useEffect, useState } from 'react'

type ServiceType<T> = () => Promise<T>

type SetterType<T> = (data: T) => void

type StoreHookType<T> = () => [T, SetterType<T>]

// function createStoreHook<T>(defaultValue: T): StoreHookType<T>
function createStoreHook<T>(
  initialValue: T,
  service?: ServiceType<T>,
): StoreHookType<T> {
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
          const currentFetchPromise = (fetchPromise =
            fetchPromise ?? service!())
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
