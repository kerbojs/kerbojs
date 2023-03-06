import { Config, Userconfig } from '@kerbojs/types'
import { existsSync, mkdirSync, readFileSync, rmSync } from 'fs'
import path from 'path'
import build from './build'

const rootPath = path.resolve('.')

/**
 * TODO:
 * * Get content from source file
 * * Translate JS to kerboscript
 */
function main() {
  const userConfig: Userconfig = loadUserConfig()
  const config: Config = {
    outDir: getOutDir(userConfig),
    sourceFile: getSource(),
  }

  console.log({ config })

  clearOutDir(config)
  build(config)
}

/**
 * Delete existing content from the project outDir.
 */
function clearOutDir(config: Required<Config>): void {
  // Remove existing build directory
  if (existsSync(config.outDir)) {
    rmSync(config.outDir, { recursive: true, force: true })
  }
  // Create build directory
  mkdirSync(config.outDir)
}

/**
 * Get the full path to project outDir.
 * @returns {String}
 */
function getOutDir(userConfig: Userconfig): string {
  return path.join(rootPath, userConfig.compilerOptions?.outDir || 'dist')
}

/**
 * TODO:
 * * Implement Userconfig.files
 * @returns {String}
 */
function getSource(): string {
  const source = process.argv[2] || null
  if (source && typeof source === 'string') {
    const sourcePath = path.join(rootPath, process.argv[2])

    if (!existsSync(sourcePath)) {
      throw new Error('Source file not found. Make sure to provide one.')
    }
    return sourcePath
  }
  throw new Error('Source file not provided.')
}

/**
 * Looks for a .kjsrc file in the project and returns its configuration if available.
 * @returns {Config}
 */
function loadUserConfig(): Userconfig {
  const configPath = path.join(rootPath, '.kerbojsrc')
  if (existsSync(configPath)) {
    const rawData = readFileSync(configPath, 'utf8')
    return JSON.parse(rawData)
  }
  return {}
}

main()
