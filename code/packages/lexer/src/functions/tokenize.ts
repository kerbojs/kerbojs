import { Token, TokenType } from '@/types'
import { keywords } from '@/utils'
import { createToken } from '.'

type Regex = {
  type: TokenType
  pattern: RegExp
}

const regexes: Regex[] = [
  {
    type: 'keyword',
    pattern: new RegExp(`^(?:${keywords.join('|')})`),
  },
  {
    type: 'operator',
    pattern:
      /^(?:\+|\-|\*|\/|\%|\*\*|\+\+|\-\-|\=\=|\!\=|\=\=\=|\!\=\=|\>|\>=|\<|\<=|\&\&|\|\||\!|\&|\||\^|\~|\<<|\>>|\>>>|\=|\+=|\-=|\*=|\/=|\%=|\*\*=|\<<=|\>>=|\>>>=|\&=|\|=|\^=|\?\:|\.\.\.|\,)/,
  },
  {
    type: 'boolean',
    pattern: /^true|false/,
  },
  {
    type: 'number',
    pattern: /^\b\d+(\.\d+)?\b/,
  },
  {
    type: 'semicolon',
    pattern: /^;/,
  },
  {
    type: 'string',
    pattern: /^(['"`]).+(\1)/,
  },
  {
    type: 'identifier',
    pattern: /^[a-zA-Z_]\w*/,
  },
]

export default function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let match: RegExpMatchArray | null
  let remainingInput = input

  while (remainingInput.length > 0) {
    match = null
    remainingInput = remainingInput.trim()

    // find the next match for any of the regular expressions
    for (const { type, pattern } of regexes) {
      match = remainingInput.match(pattern)
      if (match) {
        tokens.push(createToken(type, match[0].trim()))
        remainingInput = remainingInput.substring(match[0].length).trim()
        break
      }
    }
    // if no match was found, throw an error
    if (!match) {
      throw new Error(`Unable to generate token from: ->${remainingInput}<-`)
    }
  }
  return tokens
}
