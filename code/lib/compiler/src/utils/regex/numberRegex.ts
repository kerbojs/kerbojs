import { generateValidator } from './helpers'

export default {
  integer: generateValidator(/(?:0|-?[1-9]\d*)/),
}
