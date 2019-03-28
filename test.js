const ikkuReady = require('./index')

let findIkku

const normalIkku = '久々にオーディオ沼にはまりそう…'
const normalIkkuRes = ['久々に', 'オーディオ沼に', 'はまりそう']
const notIkku = 'これは一句読めてないです'
const tooMuchIkku = '円卓で仕事したいかと言われると'

beforeAll(() => {
  return ikkuReady().then(methods => {
    findIkku = methods.findIkku
  })
})

describe('findIkku', () => {
  test('strict', async () => {
    const res = await findIkku(normalIkku)
    expect(res).toEqual(normalIkkuRes)
    expect(await findIkku(notIkku)).toBeUndefined()
    expect(await findIkku(tooMuchIkku)).toBeUndefined()
  })
})
