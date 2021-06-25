import baretest from 'baretest'
import assert from 'assert'
import { getFileNameFromUrl, addUrlPrefix, querystringify, resolvePath } from '../../src/utils/url'

const test = baretest('url')

test('getFileNameFromUrl', async () => {
  assert.strictEqual(getFileNameFromUrl('http://a.b.c/def.gg'), 'def.gg')
  assert.strictEqual(
    getFileNameFromUrl('http://a.b.c/defffffffffffffffffffffffffffffffffff.gg'),
    'defffffffffffffffffffffffffffffffffff.gg'
  )
  assert.strictEqual(
    getFileNameFromUrl('http://a.b.c/defffffffffffffffffffffffffffffffffff.gg', 8),
    'deffffff.gg'
  )
})

test('addUrlPrefix', async () => {
  assert.strictEqual(addUrlPrefix('user/3'), 'https://a.b.c/api/user/3')
})

test('querystringify', async () => {
  assert.strictEqual(
    querystringify({
      id: 1,
      name: 'abc',
      avatar: 'http://a.b.c/xxx.png',
      address: ['A', 'B'],
      age: null,
      post: undefined,
      homepage: '',
      deep: {
        notSupport: true
      }
    }),
    'id=1&name=abc&avatar=http%3A%2F%2Fa.b.c%2Fxxx.png&address=A%2CB&deep=%5Bobject%20Object%5D'
  )
})

test('resolvePath', async () => {
  assert.strictEqual(resolvePath('a', 'b'), 'a/b')
  assert.strictEqual(resolvePath('/a', 'b'), '/a/b')
  assert.strictEqual(resolvePath('/a/', 'b'), '/a/b')
  assert.strictEqual(resolvePath('/a', '/b'), '/a/b')
  assert.strictEqual(resolvePath('/a', 'b/'), '/a/b')
  assert.strictEqual(resolvePath('/a/', '/b/'), '/a/b')
  assert.strictEqual(resolvePath('a', './b'), 'a/./b')
})

// run
;(async () => {
  await test.run()
})()
