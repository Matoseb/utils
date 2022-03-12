// https://www.youtube.com/watch?v=4joAZ2RQNys

// import babel from "rollup-plugin-babel"
import resolve from 'rollup-plugin-node-resolve'
// import { terser } from "rollup-plugin-terser"

// const NAME = 'mylibrary'
const DIR = 'dist'
// const PRODUCTION = !process.env.ROLLUP_WATCH

export default {
  input: ['src/**/*.js'],
  external: [],
  output: {
    format: 'esm',
    dir: `${DIR}`,
  },
  plugins: [
    // multiInput(),
    resolve(),
    // babel({
    //   exclude: 'node_modules/**'
    // }),
    // PRODUCTION && terser(),
  ],
}

// export default outputs.map(output => ({
//   ...common,
//   output
// }))
