// eslint-disable-next-line import/no-commonjs
/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    [
      // babel-preset-taro 更多选项和默认值：
      // https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
      'taro',
      {
        framework: 'react',
        ts: true,
      },
    ],
  ],
}
