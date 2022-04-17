// vite.config.js
import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  build: {
    minify: 'esnext',
    polyfillDynamicImport: false,
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
  plugins: [createVuePlugin(/* options */)],
}
