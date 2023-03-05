import Command from './Command'

/**
 * Prints to `stdout` with newline.
 * @param text The text to print.
 * @returns {Command}
 */
export default function print(text: string): Command {
  return new Command(`print "${text}".`)
}
