function lexer(input: string): string[] {
  input = sanitizeString(input)

  let tokens: string[] = []
  let remainingLine = input
  let buffer = 1000

  while (remainingLine.length > 0 && buffer > 0) {
    const match = remainingLine.match(
      /^(?:<newline>|[a-z]+|[0-9]+(?:\.[0-9]+)?|[,.=()]|[']{2}|["]{2}|['].+[']|["].+["]|[`][`])\s?/i,
    )
    if (!match) {
      throw new Error(`Unable to generate token from: ${remainingLine}`)
    }

    const token = match[0]
    tokens.push(token.trim())
    remainingLine = remainingLine.replace(token, '')

    buffer--
  }

  return tokens
}

function sanitizeString(input: string): string {
  return input.replace(/\|/, '=7C')
}

export default lexer
