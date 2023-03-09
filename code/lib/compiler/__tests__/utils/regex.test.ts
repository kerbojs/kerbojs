import { Validator } from '@/types'
import { lexerRegex, numberRegex } from '@/utils/regex'
import { combineRegex, generateValidator } from '@/utils/regex/helpers'
import syntaxRegex from '@/utils/regex/syntaxRegex'

describe('helpers', () => {
  describe('combineRegex()', () => {
    it('combines two regular expressions', () => {
      const regex1 = /[a-z]+/
      const regex2 = /\d+/
      const combinedRegex = combineRegex(regex1, regex2)

      expect(combinedRegex.test('abc')).toBe(true)
      expect(combinedRegex.test('123')).toBe(true)
      expect(combinedRegex.test('abc123')).toBe(true)
      expect(combinedRegex.test('')).toBe(false)
    })
  })
  describe('generateValidator()', () => {
    it('returns a Validator object', () => {
      const actual = generateValidator(/[a-zA-Z]+/)
      const expected: Validator = {
        beginsWithCheck: /^[a-zA-Z]+/,
        expression: /[a-zA-Z]+/,
        singleCheck: /^[a-zA-Z]+$/,
      }
      expect(actual).toStrictEqual(expected)
    })
  })
})

describe('lexerRegex', () => {
  describe('.newline', () => {
    const regex = lexerRegex.newline.singleCheck

    it('matches "<newline>"', () => {
      expect(regex.test('<newline>')).toBe(true)
    })
  })
})

describe('numberRegex', () => {
  describe('.integer', () => {
    const integers = {
      invalid: ['1.23', '123abc', '00', '0123'],
      valid: ['123', '-456', '0'],
    }
    it('matches valid integers', () => {
      integers.valid.forEach((i) => {
        expect(numberRegex.integer.singleCheck.test(i)).toBe(true)
      })
    })
    it("doesn't match invalid integers", () => {
      integers.invalid.forEach((i) => {
        expect(numberRegex.integer.singleCheck.test(i)).toBe(false)
      })
    })
  })
})

describe('syntaxRegex', () => {
  //#region .array
  describe.skip('.array', () => {
    const regex = new RegExp('^' + syntaxRegex.array.source + '$')

    it('matches an empty array', () => {
      expect(regex.test(`[]`)).toBe(true)
    })
    it('matches arrays with string', () => {
      expect(regex.test(`['hello', 'world']`)).toBe(true)
    })
  })
  //#endregion
  //#region .boolean
  describe('.boolean', () => {
    const regex = new RegExp('^' + syntaxRegex.boolean.source + '$')

    it('matches "true"', () => {
      expect(regex.test('true')).toBe(true)
    })
    it('matches "false"', () => {
      expect(regex.test('false')).toBe(true)
    })
  })
  //#endregion
  //#region .literal
  describe('.literal', () => {
    const regex = new RegExp('^' + syntaxRegex.literal.source + '$')

    it('matches decimal, binary, octal, and hexadecimal numbers', () => {
      expect(regex.test('-123')).toBe(true)
      expect(regex.test('0b10101')).toBe(true)
      expect(regex.test('0o777')).toBe(true)
      expect(regex.test('0xFF')).toBe(true)
    })
    it('matches single and double quoted strings, including escaped characters', () => {
      expect(regex.test(`"hello"`)).toBe(true)
      expect(regex.test(`'world'`)).toBe(true)
      expect(regex.test(`"hello \\"world\\""`)).toBe(true)
    })
    it('matches template literals, including expressions inside ${}', () => {
      expect(regex.test('`hello ${name}`')).toBe(true)
      expect(regex.test('`${firstName} ${lastName}`')).toBe(true)
    })
    it('matches arrays, including whitespace between elements', () => {
      expect(regex.test(`[1, 2, 3]`)).toBe(true)
    })
  })
  //#endregion
  //#region .null
  describe('.null', () => {
    const regex = new RegExp('^' + syntaxRegex.null.source + '$')

    it('matches "null"', () => {
      expect(regex.test('null')).toBe(true)
    })
  })
  //#endregion
  //#region .string
  describe('.string', () => {
    const regex = new RegExp('^' + syntaxRegex.string.source + '$')

    it('matches all quote types', () => {
      expect(regex.test(`'hello'`)).toBe(true)
      expect(regex.test(`"hello"`)).toBe(true)
    })
    it('matches empty string', () => {
      expect(regex.test(`''`)).toBe(true)
      expect(regex.test(`""`)).toBe(true)
    })
    it.skip('handles escaped quotes inside string', () => {
      expect(regex.test(`'Hello, \\'world\\'!'`)).toBe(true)
    })
    it('matches correct usage', () => {
      expect(regex.test(`Hello, world!`)).toBe(false)
      expect(regex.test(`'Hello, world!'`)).toBe(true)
      expect(regex.test(`"hello'`)).toBe(false)
      expect(regex.test(`'`)).toBe(false)
      expect(regex.test(`"`)).toBe(false)
    })
  })
  //#endregion
  //#region .undefined.
  describe('.undefined', () => {
    const regex = new RegExp('^' + syntaxRegex.undefined.source + '$')

    it('matches "undefined"', () => {
      expect(regex.test('undefined')).toBe(true)
    })
  })
  //#endregion
})
