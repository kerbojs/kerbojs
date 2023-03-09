import { combineRegex, generateValidator } from './helpers'

// Primitives
const booleanRegex = /true|false/
const nullRegex = /null/
const undefinedRegex = /undefined/

const primitiveRegex = combineRegex(booleanRegex, nullRegex, undefinedRegex)

const literalRegex = combineRegex(
  primitiveRegex,
  /-?\d+(?:\.\d*)?(?:e[+-]?\d+)?|0b[01]+|0o[0-7]+|0x[\da-f]+|(?<!\\)(?:"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'|`(?:\\.|[^\\`])*`|\[(?:[\w\s]*,?\s*)*\]|\{(?:[\w\s]*:.*(?:,|(?=\s*}))?\s*)*\})/i,
)

export default {
  literal: generateValidator(literalRegex),
  newline: generateValidator(/[<]newline[>]/),
}
