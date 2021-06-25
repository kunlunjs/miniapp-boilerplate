import { Button } from '@tarojs/components'
import type { CSSProperties } from 'react'
import React from 'react'

interface ShareBtnProps {
  title?: string
}

const btnStyles: CSSProperties = {
  width: '352rpx'
}

const ShareBtn: React.FC<ShareBtnProps> = ({ title = '分享好友' }) => {
  return (
    <Button openType="share" className="btn btn-default btn-md radius-sm" style={btnStyles}>
      {title}
    </Button>
  )
}

export default ShareBtn
