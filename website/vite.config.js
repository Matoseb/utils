// vite.config.js
import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  build: {
    minify: 'esnext',
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  server: {
    host: true,
    port: 1000,
  },
  // optimizeDeps: {
  //   exclude: ["./"],
  // },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "styling/__variables.scss";
          @import "styling/__mixins.scss";
        `,
      },
    },
  },
  base: 'snippets/',
  plugins: [createVuePlugin(/* options */)],
}
