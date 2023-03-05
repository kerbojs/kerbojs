import { KjsConfig } from '@kjs/types'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import path from 'path'

const rootPath = path.resolve('.')

let config: KjsConfig = {}

function main() {
  // console.log(process.argv)
  configure()
}

function build() {
  if (config.outDir && config.source) {
    const sourceFileName = path.parse(config.source).name
    const buildFilePath = path.join(config.outDir, sourceFileName + '.ks')

    // Dummy data for the build file
    const content = 'print "TEST".\n'

    // Write a dummy `${config.outDir}/${sourceFileName}.ks` file
    writeFileSync(buildFilePath, content, 'utf8')
  }
}

function configure() {
  populateConfig()
  initializeOutDir()
  setSource()
  build()

  console.log(config)
}

/**
 * Assigns a full path to config.outDir.
 */
function initializeOutDir() {
  if (config.outDir) {
    config.outDir = path.join(rootPath, config.outDir)
  } else {
    config.outDir = path.join(rootPath, 'dist')
  }

  // Remove existing build directory
  if (existsSync(config.outDir)) {
    rmSync(config.outDir, { recursive: true, force: true })
  }
  // Create build directory
  mkdirSync(config.outDir)
}

/**
 * Looks for a .kjsrc file in the project and applies the provided settings to the config object.
 */
function populateConfig() {
  const configPath = path.join(rootPath, '.kjsrc')

  if (existsSync(configPath)) {
    const rawData = readFileSync(configPath, 'utf8')
    config = JSON.parse(rawData)
  }
}

function setSource() {
  const sourcePath = process.argv[2] || null
  if (sourcePath && typeof sourcePath === 'string') {
    config.source = path.join(rootPath, process.argv[2])

    if (!existsSync(config.source)) {
      throw new Error('Source file not found. Make sure to provide one.')
    }
  }
}

export default main
