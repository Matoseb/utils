// https://www.youtube.com/watch?v=4joAZ2RQNys

import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import { terser } from "rollup-plugin-terser"

const NAME = 'mylibrary'
const DIR = 'dist'
const PRODUCTION = !process.env.ROLLUP_WATCH

function file({ fileName = NAME, format, dir = DIR, ...options }) {
  return {
    file: `${dir}/${fileName}.${format}.js`,
    format,
    ...options
  }
}

const outputs = [
  file({ format: 'esm' }),
  file({ format: 'cjs' }),
  file({
    format: 'umd', name: NAME, globals: {
      // react: 'React'
    }
  }),
]

const common = {
  input: 'src/index.js',
  external: [],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    PRODUCTION && terser(),
  ]
}

export default outputs.map(output => ({
  ...common,
  output
}))