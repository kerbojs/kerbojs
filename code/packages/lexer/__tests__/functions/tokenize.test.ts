import { tokenize } from '@/functions'

describe('tokenize', () => {
  it('returns an array', () => {
    const actual = Array.isArray(tokenize(''))
    expect(actual).toBe(true)
  })

  it('handles keywords', () => {
    const tokens = tokenize('const')
    expect(tokens.length).toBe(1)
    expect(tokens[0].type).toBe('keyword')
    expect(tokens[0].value).toBe('const')
  })

  it('handles booleans', () => {
    const tokens = tokenize('const isDisabled = true')
    expect(tokens.length).toBe(4)

    expect(tokens[3].type).toBe('boolean')
    expect(tokens[3].value).toBe('true')
  })

  it('returns tokens', () => {
    const tokens = tokenize('const x = 42')
    expect(tokens.length).toBe(4)

    tokens.forEach((token) => {
      expect(token.type).toBeDefined()
      expect(token.value).toBeDefined()
      expect(typeof token.value).toBe('string')
    })
  })

  it('handles strings', () => {
    const input = `'Hello World!'`
    const tokens = tokenize(input)
    expect(tokens.length).toBe(1)

    const token = tokens[0]
    expect(token.type).toBe('string')
    expect(token.value).toBe(input)
  })

  it('handles numbers', () => {
    const input = `123`
    const tokens = tokenize(input)
    expect(tokens.length).toBe(1)

    const token = tokens[0]
    expect(token.type).toBe('number')
    expect(token.value).toBe(input)
  })
})
