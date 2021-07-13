/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['taro/react', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'import/no-commonjs': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
}
