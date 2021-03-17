module.exports = {
  extends: ['taro/react'],
  overrides: [
    {
      files: ['config/*.js'],
      rules: {
        'import/no-commonjs': 'off',
      },
    },
  ],
}
