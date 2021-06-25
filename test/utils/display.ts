import baretest from 'baretest'
import assert from 'assert'
import { replaceRichText } from '../../src/utils/display'

const test = baretest('display')

const richText = `<p class="text" style="color:#000;font-size:14px">这是一段内容</p>\
<span style="background-color:red;">文本</span>\
<img src="http://a.b.c/d.png">\
<video src="http://a.b.c/d.mp4" />\
`
const richText1 = `<p class="text" style="color:#000;font-size:14px">这是一段内容</p>\
<span style="background-color:red;">文本</span>\
<img src="http://a.b.c/d.png" class="img" style="border:1px solid #999;">\
<video src="http://a.b.c/d.mp4" />\
`

test('replaceRichText', async () => {
  assert.strictEqual(
    replaceRichText(richText),
    `<p class="text" style="color:#000;font-size:14px">这是一段内容</p>\
<span style="background-color:red;">文本</span>\
<img src="http://a.b.c/d.png" style="max-width:100%;height:auto;" />\
<video src="http://a.b.c/d.mp4" />\
`
  )
})

test('replaceRichText', async () => {
  assert.strictEqual(
    replaceRichText(richText1),
    `<p class="text" style="color:#000;font-size:14px">这是一段内容</p>\
<span style="background-color:red;">文本</span>\
<img src="http://a.b.c/d.png" class="img" style="border:1px solid #999;max-width:100%;height:auto;">\
<video src="http://a.b.c/d.mp4" />\
`
  )
})

// run
;(async () => {
  await test.run()
})()
