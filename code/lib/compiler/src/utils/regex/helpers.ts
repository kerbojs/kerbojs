import { Validator } from '@/types'

/**
 * Combines two or more regular expressions as alternatives.
 * @param regexArr  An array of regular expressions
 * @returns         A combination of the provided expressions
 */
export function combineRegex(...regexArr: RegExp[]): RegExp {
  // Join the regular expressions into a single string
  const regexString = regexArr.map((r) => r.source).join('|')

  // create a new regular expression from the combined string
  return new RegExp(regexString)
}

/**
 * @deprecated
 */
export function generateValidator(expression: RegExp): Validator {
  return {
    beginsWithCheck: new RegExp('^' + expression.source),
    expression,
    singleCheck: new RegExp('^' + expression.source + '$'),
  }
}
