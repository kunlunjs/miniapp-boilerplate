module.exports = {
  extends: ['taro/react'],
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
  },
  overrides: [
    {
      files: ['config/*.js'],
      rules: {
        'import/no-commonjs': 'off',
      },
    },
  ],
}
