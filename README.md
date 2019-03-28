# find ikku

[![Build Status](https://travis-ci.com/sunya9/find-ikku.svg?branch=master)](https://travis-ci.com/sunya9/find-ikku)

Find [Haiku](https://en.wikipedia.org/wiki/Haiku) from sentences. Actually, not haiku but [Senryu](https://en.wikipedia.org/wiki/Senry%C5%AB).

## How to use

```javascript
async function find(text) {
  const { findIkku, findIkkus } = await ikkuReady()
  await findIkku('有名な俳句といえば「古池や蛙飛びこむ水の音」です') // => ['古池や', '蛙飛びこむ', '水の音']
  await findIkkus(
    '「古池や蛙飛びこむ水の音」以外にも「菜の花や月は東に日は西に」が有名です。'
  ) // => [['古池や', '蛙飛びこむ', '水の音'], ['菜の花や', '月は東に', '日は西に']]
}
```
