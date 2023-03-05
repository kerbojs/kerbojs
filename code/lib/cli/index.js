#!/usr/bin/env node

const majorNodeVersion = parseInt(
  process.version.toString().replace('v', '').split('.')[0],
  10,
)
if (majorNodeVersion < 16) {
  console.error('To run kerbojs you need to have node 16 or higher')
  process.exit(1)
}

require('@kerbojs/core')
