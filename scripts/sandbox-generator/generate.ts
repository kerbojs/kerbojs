import { cpSync } from 'fs'
import path from 'path'

const rootPath = path.resolve('.', '../')
const templatePath = path.resolve(__dirname, 'template')
const destPath = path.resolve(rootPath, 'sandbox')

cpSync(templatePath, destPath, { recursive: true })
