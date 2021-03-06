const { getTokenizer } = require('kuromojin')

const correctPhraseLengths = [5, 7, 5]
const correctLength = 17
const independentWords = [
  '動詞',
  '形容詞',
  '形容動詞',
  '名詞',
  '副詞',
  '連体詞',
  '接続詞',
  '感動詞'
]
const actuallyPronunciationLength = reading =>
  reading.replace(/[ぁぃぅぇぉゃゅょァィゥェォャュョ]/g, '').length
const isIndependentWord = word =>
  independentWords.some(independant => word.pos === independant)

let tokenizer

function findIkkuInternal(words) {
  const res = [[], [], []]
  let l = 0

  for (let i = 0; i < words.length && l < 3; i++) {
    const word = words[i]
    const currentLen = res[l].reduce(
      (sum, word) => sum + actuallyPronunciationLength(word.reading),
      0
    )
    if (currentLen == 0 && !isIndependentWord(word)) return null
    const willLength = currentLen + actuallyPronunciationLength(word.reading)
    if (willLength > correctPhraseLengths[l]) return null
    res[l].push(word)
    if (willLength == correctPhraseLengths[l]) {
      l++
    }
  }
  const resLength = res.reduce(
    (sum, phrase) =>
      sum +
      phrase.reduce(
        (sum, word) => sum + actuallyPronunciationLength(word.reading),
        0
      ),
    0
  )
  return resLength === correctLength
    ? res.map(phrase => phrase.map(word => word.surface_form).join(''))
    : null
}

function findIkkus(text) {
  const tokenized = tokenizer.tokenizeForSentence(text)
  const words = tokenized.filter(word => word.basic_form !== '*')

  const beginningPoints = words.reduce((res, word, i) => {
    if (!isIndependentWord(word)) return res
    res.push(i)
    return res
  }, [])
  const ikkus = beginningPoints
    .map(point => findIkkuInternal(words.slice(point)))
    .filter(ikku => !!ikku)
  return ikkus
}

const findIkku = async text => await findIkkus(text)[0]

async function ready() {
  tokenizer = await getTokenizer()
  return {
    findIkku,
    findIkkus
  }
}

module.exports = ready
