//#region imports
import { combineRegex } from './helpers'
//#endregion

//#region Numbers
const binaryRegex = /0b[01]+/
const decimalRegex = /-?\d+(?:\.\d*)?(?:e[+-]?\d+)?/
const hexadecimalRegex = /0x[\da-f]+/
const integerRegex = /0|-?[1-9]\d*/
const octalRegex = /0o[0-7]+/
//#endregion

//#region Primitives
const booleanRegex = /true|false/
const nullRegex = /null/
const numberRegex = combineRegex(
  decimalRegex,
  binaryRegex,
  octalRegex,
  hexadecimalRegex,
)
const stringRegex = /(['"])(?:(?!\1).)*\1/
const undefinedRegex = /undefined/
//#endregion

//#region Literals
const arrayRegex = new RegExp(
  '\\[(?:' + stringRegex.source + '(?:[,]\\s?)?)?\\]',
)
const primitiveRegex = combineRegex(
  booleanRegex,
  nullRegex,
  numberRegex,
  undefinedRegex,
)
//#endregion

const literalRegex = combineRegex(
  primitiveRegex,
  /(?<!\\)(?:"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'|`(?:\\.|[^\\`])*`|\[(?:[\w\s]*,?\s*)*\]|\{(?:[\w\s]*:.*(?:,|(?=\s*}))?\s*)*\})/i,
)

console.log(stringRegex)

export default {
  array: arrayRegex,
  boolean: booleanRegex,
  literal: literalRegex,
  null: nullRegex,
  string: stringRegex,
  undefined: undefinedRegex,
}
