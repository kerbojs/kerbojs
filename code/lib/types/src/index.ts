export type Config = {
  /**
   * Specify an output folder for all emitted files.
   */
  outDir: string
  /**
   * Specifies a glob patterns that match the file to be included in compilation.
   */
  sourceFile: string
}

/**
 * JSON schema for the KerboJS compiler's configuration file.
 */
export type Userconfig = {
  /**
   * Instructs the KerboJS compiler how to compile `.js` files.
   */
  compilerOptions?: {
    /**
     * Specify an output folder for all emitted files.
     */
    outDir?: string
  }
  /**
   * If no `files` or `include` property is present in a
   * `.kerbojsrc`, the compiler defaults to including all
   * files in the containing directory and subdirectories
   * except those specified by `exclude`.
   * When a `files` property is specified, only those files
   * and those specified by `include` are included.
   */
  files?: string[]
}
