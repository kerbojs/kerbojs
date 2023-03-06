import { Config } from '@kerbojs/types'
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
  const userConfig: Config = loadUserConfig()
  const config: Required<Config> = {
    outDir: getOutDir(userConfig),
    source: getSource(),
  }
  // console.log(config)
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
 * @returns {string}
 */
function getOutDir(userConfig: Config): string {
  if (userConfig.outDir) {
    return path.join(rootPath, userConfig.outDir)
  }
  return path.join(rootPath, 'dist')
}

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
function loadUserConfig(): Config {
  const configPath = path.join(rootPath, '.kerbojsrc')
  console.log('loading')
  console.log(configPath)

  if (existsSync(configPath)) {
    const rawData = readFileSync(configPath, 'utf8')
    return JSON.parse(rawData)
  }
  return {}
}

main()
