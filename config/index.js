// eslint-disable-next-line import/no-commonjs
// const WindiCSS = require('windicss-webpack-plugin').default
const path = require('path')

function getAbsolutePath(url) {
  return path.resolve(__dirname, url)
}

// function addWindiPlugin(webpackChain) {
//   webpackChain.plugin('windicss').use(WindiCSS)
// }

const config = {
  projectName: 'miniapp-boilerplate',
  date: '2021-3-17',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  alias: {
    '@': getAbsolutePath('../src')
  },
  plugins: [],
  defineConstants: {
    // 可用于发布时修改api地址
    'process.env.API_URL': JSON.stringify(process.env.API_URL),
    'process.env.ASSET_URL': JSON.stringify(process.env.ASSET_URL)
  },
  copy: {
    patterns: [
      { from: 'sitemap.json', to: 'dist/sitemap.json' },
      { from: 'src/assets/tabbar', to: 'dist/assets/tabbar' }
      // { from: 'src/assets/local', to: 'dist/assets/local' }
    ],
    options: {}
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true
    }
    // webpackChain (chain, webpack) {
    //   addWindiPlugin(chain)
    // }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
    // webpackChain (chain, webpack) {
    //   addWindiPlugin(chain)
    // }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
