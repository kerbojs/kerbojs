import lexer from './functions/lexer'

const data = `
const myGreeting = 'Hello World!'
log(myGreeting)
`

const lexerAnalysis = (input: string): string[] => {
  return lexer(
    JSON.stringify(input)
      .trim()
      .replace(/\"/g, '')
      .replace(/^\\n/, '')
      .replace(/\\n$/, '')
      .replace(/(\\n){1,}/g, '<newline>'),
  )
}

const result = lexerAnalysis(data)

console.log(result)
