module.exports = {
  extends: ['taro/react'],
  plugins: ['prettier'],
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'prettier/prettier': 'error',
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
