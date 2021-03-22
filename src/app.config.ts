import { Config } from '@tarojs/taro'

type MinaConfig = Config & { [ke: string]: any }

const config: MinaConfig = {
  lazyCodeLoading: 'requiredComponents',
  pages: ['pages/index/index', 'pages/tab/index', 'pages/my/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '标题',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#8A8A8A',
    selectedColor: '#000',
    list: [
      {
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home_on.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'assets/tabbar/parlor.png',
        selectedIconPath: 'assets/tabbar/parlor_on.png',
        pagePath: 'pages/tab/index',
        text: 'Tab',
      },
      {
        iconPath: 'assets/tabbar/my.png',
        selectedIconPath: 'assets/tabbar/my_on.png',
        pagePath: 'pages/my/index',
        text: '我的',
      },
    ],
  },
}

// 开发环境添加组件示例页面
if (process.env.NODE_ENV === 'development') {
  config.pages!.push('pages/components/index')
}

export default config
