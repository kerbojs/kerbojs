import { lexer } from '@/functions'

describe('lexer', () => {
  const compare = (input: string, expected: string[]) => {
    expect(lexer(input)).toStrictEqual(expected)
  }

  it('returns an Array', () => {
    const actual = Array.isArray(lexer(`hello`))
    expect(actual).toBe(true)
  })

  it('handles a <newline> element', () => {
    compare(`hello<newline>world`, [`hello`, `<newline>`, `world`])
  })

  describe('handles strings', () => {
    it('empty', () => {
      compare(`''`, [`''`])
      compare(`""`, [`""`])
    })
    it('no spaces', () => {
      compare(`'hello'`, [`'hello'`])
      compare(`"hello"`, [`"hello"`])
    })
    it('with spaces', () => {
      compare(`'hello world'`, [`'hello world'`])
      compare(`"hello world"`, [`"hello world"`])
    })
    it.skip('with symbols', () => {
      compare(`'§'!"#$€%&/()=?+~@*,.-;:_‚…–´'`, [
        `'§'!"#$€%&/|\\()[]{}=?+~@*,.-;:_‚…–´'`,
      ])
    })
    it.skip('template literals', () => {
      compare('`hello ${name}`', ['`hello ${name}`'])
    })
    it('throws error on unmatching quotes', () => {
      expect(() => {
        lexer(`'"`)
      }).toThrowError()
      expect(() => {
        lexer(`"'`)
      }).toThrowError()
      expect(() => {
        lexer(`'Hello World!"`)
      }).toThrowError()
      expect(() => {
        lexer(`"Hello World!'`)
      }).toThrowError()
    })
  })

  describe('handles numbers', () => {
    it('integers', () => {
      compare(`2000`, [`2000`])
    })
    it('decimals', () => {
      compare(`3.14`, [`3.14`])
    })
  })

  describe('handles variable definitions', () => {
    it('let <name>', () => {
      compare(`let age`, [`let`, `age`])
    })
    it('const <name> = <var>', () => {
      compare(`const age = myVar`, [`const`, `age`, `=`, `myVar`])
    })
    it('const <name> = <number>', () => {
      compare(`const age = 93`, [`const`, `age`, `=`, `93`])
    })
    it('const <name> = <string>', () => {
      compare(`const greeting = 'Hello World!'`, [
        `const`,
        `greeting`,
        `=`,
        `'Hello World!'`,
      ])
    })
  })

  describe('handles function calls', () => {
    it('with no arguments', () => {
      compare(`print()`, [`print`, `(`, `)`])
    })
    it('with one argument', () => {
      compare(`print('Hello World!')`, [`print`, `(`, `'Hello World!'`, `)`])
    })
    it('with multiple arguments', () => {
      const actual = lexer(`print('Hello World!', 92, name)`)
      const expected = [
        `print`,
        `(`,
        `'Hello World!'`,
        `,`,
        `92`,
        `,`,
        `name`,
        `)`,
      ]

      expect(actual).toStrictEqual(expected)
    })
  })

  describe('handles methods', () => {
    it('without arguments', () => {
      compare(`console.log()`, [`console`, `.`, `log`, `(`, `)`])
    })
    it('with arguments', () => {
      const actual = lexer(`console.log('Hello World!', 92, name)`)
      const expected = [
        `console`,
        `.`,
        `log`,
        `(`,
        `'Hello World!'`,
        `,`,
        `92`,
        `,`,
        `name`,
        `)`,
      ]

      expect(actual).toStrictEqual(expected)
    })
  })
})
