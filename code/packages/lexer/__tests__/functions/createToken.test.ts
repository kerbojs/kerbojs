import { createToken } from '@/functions'

describe('createToken', () => {
  it('returns a token', () => {
    const token = createToken('keyword', 'const')
    expect(token).toStrictEqual({
      type: 'keyword',
      value: 'const',
    })
  })
})
