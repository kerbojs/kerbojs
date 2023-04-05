import { Token, TokenType } from '@/types'

/**
 * Creates a lexer analysis token.
 */
export default function createToken(type: TokenType, value: string): Token {
  return { type, value }
}
