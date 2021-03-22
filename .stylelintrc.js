module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'selector-type-no-unknown': [
      true,
      {
        // 需要忽略的特定的选择器
        ignoreTypes: ['page'],
      },
    ],
  },
}
