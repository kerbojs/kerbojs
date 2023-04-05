export type Token = {
  type: TokenType
  value: string
}

export type TokenType =
  | 'boolean'
  | 'identifier'
  | 'keyword'
  | 'number'
  | 'operator'
  | 'semicolon'
  | 'string'
