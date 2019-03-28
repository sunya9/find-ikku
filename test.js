const ikkuReady = require('./index')

let findIkku, findIkkus

beforeAll(async () => {
  const methods = await ikkuReady()
  findIkku = methods.findIkku
  findIkkus = methods.findIkkus
})

test('findIkku', async () => {
  expect(
    await findIkku('有名な俳句といえば「古池や蛙飛びこむ水の音」です')
  ).toEqual(['古池や', '蛙飛びこむ', '水の音'])
  expect(await findIkku('久々にオーディオ沼にはまりそう…')).toEqual([
    '久々に',
    'オーディオ沼に',
    'はまりそう'
  ])
  expect(await findIkku('これは一句読めてないです')).toBeUndefined()
  expect(await findIkku('円卓で仕事したいかと言われると')).toBeUndefined()
})

test('findIkkus', async () => {
  expect(
    await findIkkus(
      'いやだいぶ適当だけどそれはそう。ここは一句読めてないけど、久々にオーディオ沼にはまりそう'
    )
  ).toEqual([
    ['いやだいぶ', '適当だけど', 'それはそう'],
    ['久々に', 'オーディオ沼に', 'はまりそう']
  ])
  expect(
    await findIkkus(
      '「古池や蛙飛びこむ水の音」以外にも「菜の花や月は東に日は西に」が有名です。'
    )
  ).toEqual([
    ['古池や', '蛙飛びこむ', '水の音'],
    ['菜の花や', '月は東に', '日は西に']
  ])
  expect(await findIkkus('一句できないよ！！！')).toEqual([])
})
