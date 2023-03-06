import { Config } from '@kerbojs/types'
import { writeFileSync } from 'fs'
import path from 'path'

export default function build(config: Required<Config>) {
  const sourceFileName = path.parse(config.source).name
  const buildFilePath = path.join(config.outDir, sourceFileName + '.ks')

  // Dummy data for the build file
  const content = 'print "TEST".\n'

  // Write a dummy `${config.outDir}/${sourceFileName}.ks` file
  writeFileSync(buildFilePath, content, 'utf8')
}
