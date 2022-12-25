// vite.config.js
import { createVuePlugin } from 'vite-plugin-vue2'
import importToCDN from 'vite-plugin-cdn-import'

export default {
  build: {
    minify: 'esnext',
    polyfillDynamicImport: false,
  },
  server: {
    host: true,
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
  plugins: [
    // importToCDN({
    //   modules: [
    //     {
    //       name: '@matoseb/utils',
    //       var: 'utils',
    //       path: '../',
    //     },
    //   ],
    // }),
    createVuePlugin(/* options */),
  ],
}
