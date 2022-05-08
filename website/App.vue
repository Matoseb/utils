<template lang="pug">
  #app
    header.header
      .header__title
        h1
          Clipboard(
            name="@matoseb/utils"
            :text="textString"
          )
        span.header__version(v-if="infos.version") {{" v" + infos.version}}
      input.header__search(
        v-shortkey="['meta', 'f']" @shortkey="focusSearch"
        type="search"
        ref="search"
        v-model="searchString"
        :placeholder="searchPlaceholder"
      )
    main.libs
      .libs__loading(
        v-if="loading"
      )
        | Loading package from unpkg.com
        TextAnimation(
          :interval="200"
          :frames="['.', '..', '...']"
        )
      template(
        v-else
        v-for="(item, index) in librairies"
      )
        details.libs__modules(
          open
          v-if="item.methods.length > 0"
        )
          summary.libs__modules__summary
            h2 {{item.name}}
            //- Method(
            //-   :name="item.name"
            //-   v-bind="toObject(item)"
            //- )
          .libs__modules__items
            Method.libs__modules__items-item(
              v-for="([name, method], index) in item.methods"
              :name="name"
              :method="method"
              :key="index"
            )
    footer.footer
      hr
      ul.footer__links
        li
          Link(href="https://github.com/Matoseb/utils" external) github
        li
          Link(href="https://www.npmjs.com/package/@matoseb/utils" external) npm
        li
          Link(@click.native="onDownloadBtn" :disabled="!textLib") download
        li
          Link(href="https://www.buymeacoffee.com/sebastien.matos" external) donate
</template>
<script>
import MethodComponent from './components/Method.vue'
import platform from 'platform-detect'
import Clipboard from './components/Clipboard.vue'
import Link from './components/Link.vue'
import TextAnimation from './components/TextAnimation.vue'
import FuzzySearch from 'fuzzy-search'
import { isModule } from './utils'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import stringifyObject from 'stringify-object'

export default {
  components: {
    Method: MethodComponent,
    Clipboard,
    Link,
    TextAnimation,
  },
  metaInfo: {
    title: '@matoseb/utils',
    // titleTemplate: '%s - Yay!',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
    meta: [{ name: 'description', content: 'Javascript utilitaries' }],
  },
  data() {
    return {
      url: 'https://unpkg.com/@matoseb/utils',
      allLibrairies: [],
      loading: true,
      infos: { version: null, fileName: 'matoseb-utils' },
      searchString: '',
      textLib: null,
    }
  },
  computed: {
    searchPlaceholder() {
      const shortcut = platform.mouse
        ? platform.macos
          ? '⌘F'
          : 'Ctrl F'
        : ''

      return `Search ${shortcut}`
    },
    flattenedLibrairies() {
      const flattened = []
      this.allLibrairies.forEach((module) => {
        const { name: category } = module

        const libs = isModule(module.lib)
          ? module.lib
          : { [category]: module.lib }

        const result = Object.entries(libs).map(([name, method]) => {
          method = stringifyObject(method, {
            transform: (obj, prop, originalResult) => originalResult,
          })
          return { name, method, category }
        })

        flattened.push(...result)
      })
      return flattened
    },
    librairies() {
      return this.allLibrairies.map((item) => ({
        name: item.name,
        methods: this.getMethod(item),
      }))
    },

    filtered() {
      if (isWhiteSpaceOnly(this.searchString)) return this.flattenedLibrairies

      const searcher = new FuzzySearch(
        this.flattenedLibrairies,
        ['name', 'category'],
        {
          caseSensitive: false,
          sort: true,
        }
      )
      return searcher.search(this.searchString)
    },

    textString() {
      const version = this.infos.version ? `@${this.infos.version}` : ''
      // bug https://githubhot.com/repo/underfin/vite-plugin-vue2/issues/131
      return `<script src="${this.url}${version}"><\/script>`
    },
  },
  async mounted() {
    const infos = await fetch(`${this.url}/package.json`).then((e) => e.json())
    // console.log(`${this.url}@${infos.version}`)
    fetch(`${this.url}@${infos.version}`)
      .then((e) => e.text())
      .then((txt) => {
        this.textLib = txt
      })

    let libs = await import(
      /* @vite-ignore */ `${this.url}@${infos.version}/src/index.js`
    )

    libs = Object.entries(libs).map(([name, lib]) => ({ name, lib }))
    libs.sort((a, b) => a.name.localeCompare(b.name))

    this.allLibrairies = libs
    this.infos = Object.assign({}, this.infos, infos)

    this.loading = false

    if (platform.mouse) this.focusSearch()
  },
  methods: {
    focusSearch() {
      const elem = this.$refs.search
      elem.focus()
      elem.select()
    },
    toObject(item) {
      const lib = this.getMethod(item)
      return { name: item.name, method: Object.fromEntries(lib) }
    },
    inFiltered({ name, category }) {
      return (
        this.filtered.find(
          (item) => item.name === name && item.category === category
        ) !== undefined
      )
    },
    getMethod(item) {
      const { lib, name: category } = item
      const methods = []

      const libs = isModule(lib) ? lib : { [category]: lib }

      Object.entries(libs).forEach(([name, method]) => {
        const match = this.inFiltered({ name, category })
        if (match) methods.push([name, method])
      })

      return methods
    },
    onDownloadBtn(event) {
      event.preventDefault()
      const { fileName, version } = this.infos
      const name = `${fileName}-v${version}`
      const zip = new JSZip()
      zip.file(`${name}.js`, this.textLib)
      zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, `${name}.zip`) // 2) trigger the download
      }, console.error)
    },
  },
}

function isWhiteSpaceOnly(str) {
  return str.trim().length === 0
}
</script>
<style lang="scss">
#app {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}

.header {
  position: sticky;
  top: 0;
  background-color: $color-light;
  justify-content: space-between;
  z-index: 100;
  flex: 0 0 auto;
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  &__title {
    flex-wrap: nowrap;
    display: flex;

    > h1 {
      display: flex;
    }

    > span {
      padding: $gap-medium;
      padding-left: 0;
    }
  }

  &__version {
    display: flex;
  }

  &__search {
    position: relative;
    font-weight: bold;
    // border-bottom: 1px solid $color-dark;

    &::placeholder {
      font-weight: normal;
    }

    @include button;
  }
}

.footer {
  flex: 0 0 auto;

  &__links {
    display: flex;

    > :last-child {
      margin-left: auto;
    }
  }
}

.libs {
  flex: 1 1 auto;
  position: relative;
  padding: $gap-medium;
  width: 100%;

  &__modules {
    & + & {
      margin-top: $gap-medium;
    }

    width: 100%;

    &__summary {
    }

    &__items {
      display: flex;
      flex-wrap: wrap;
      padding: $gap-small;
      &-item {
      }
    }
  }
}
</style>
