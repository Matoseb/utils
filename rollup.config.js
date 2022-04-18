// https://www.youtube.com/watch?v=4joAZ2RQNys

// import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

// const NAME = 'utils'
// const DIR = 'dist'
const PRODUCTION = !process.env.ROLLUP_WATCH

export default {
  input: ['src/index.js'],
  external: [],
  output: [
    {
      format: 'umd',
      file: 'dist/utils.umd.js',
      name: 'MatosebUtils',
      sourcemap: true,
    },
    {
      format: 'esm',
      file: 'dist/utils.esm.js',
      sourcemap: true,
    },
    {
      format: 'cjs',
      file: 'dist/utils.cjs.js',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    // babel({
    //   runtimeHelpers: true,
    //   exclude: 'node_modules/**',
    // }),
    PRODUCTION && terser(),
  ],
}
