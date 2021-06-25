// import Loading from '../loading'
import { View } from '@tarojs/components'
import type { ReactElement } from 'react'
import React from 'react'
import type { LoadingProps } from '../Loading'
import Loading from '../Loading'

const DefaultError: React.FC = () => {
  return <View>系统出错了...</View>
}
const isFunction = (value: unknown) => typeof value === 'function'

type RenderFunction = () => React.ReactElement
type BooleanFunction = () => boolean

interface PreProcessorProps extends LoadingProps {
  error?: boolean | BooleanFunction
  loading?: boolean | BooleanFunction
  children: React.ReactElement | RenderFunction
}
const PreProcessor: React.FC<PreProcessorProps> = ({
  error = false,
  loading = false,
  children,
  ...loadingProps
}) => {
  try {
    const errorValue = isFunction(error) ? (error as BooleanFunction)() : error
    if (errorValue) {
      return <DefaultError />
    }

    const loadingValue = isFunction(loading) ? (loading as BooleanFunction)() : loading
    if (loadingValue) {
      return <Loading {...loadingProps} className="pt-100" />
    }

    if (isFunction(children)) {
      return (children as RenderFunction)()
    }
    return children as ReactElement
  } catch (err) {
    console.error(err)
    return <DefaultError />
  }
}

export default PreProcessor
