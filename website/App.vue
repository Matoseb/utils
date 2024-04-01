<template lang="pug">
#app
  header.header
    .header__title
      details(
        ref="allDetailsElem"
        @click.prevent="toggleDetails"
      )
        summary
      h1
        Clipboard(
          name="@matoseb/utils"
          :text="textString"
        )
      span.header__version(v-if="infos.version") {{" v" + infos.version}}
    .header__right
      label.header__checkbox(
        :class="{ '--active': copyDeps }"
      )
        input(type="checkbox" v-model="copyDeps")
        | With dependencies
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
      v-for="(item) in librairies"
    )
      v-details.libs__modules(
        v-model="details[item.index].value"
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
            :depedencies="getDepedencies(name, method, flattenedLibrairies)"
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
import { getLocal, setLocal } from './utils'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import stringifyObject from 'stringify-object'
import * as MatosebUtils from '@matoseb/utils/src'
import infos from '@matoseb/utils/package.json'

function isModule(value) {
  return typeof value === 'object'
}

export default {
  components: {
    Method: MethodComponent,
    Clipboard,
    Link,
    TextAnimation,
  },
  data() {
    return {
      url: 'https://unpkg.com/@matoseb/utils',
      allLibrairies: [],
      loading: true,
      copyDeps: getLocal('copyDeps', true),
      searchString: getLocal('searchString', ''),
      textLib: null,
      infos,
      details: [],
      allDetails: true,
    }
  },
  watch: {
    details: {
      handler(value) {
        const elem = this.$refs.allDetailsElem
        elem.open = !value.every((detail) => detail.value === false)
        setLocal('details', value)
      },
      deep: true,
    },
    searchString(value) {
      setLocal('searchString', value)
    },
    filtered() {
      if (this.searchIsEmpty) return

      this.librairies.forEach((e) => {
        const opened = e.methods.length > 0
        const detail = this.details[e.index]
        if (detail.initial === null) detail.initial = detail.value
        detail.value = opened
      })
    },
    //! must update after filtered!
    searchIsEmpty(isEmpty) {
      if (!isEmpty) return

      this.details.map((detail) => {
        detail.value = detail.initial
        detail.initial = null
      })
    },
    copyDeps: {
      handler(value) {
        document.body.classList.toggle('--highlight-deps', value)
        setLocal('copyDeps', value)
      },
      immediate: true,
    },
  },
  computed: {
    searchIsEmpty() {
      return isWhiteSpaceOnly(this.searchString)
    },
    searchPlaceholder() {
      const shortcut = platform.mouse ? (platform.macos ? '⌘F' : 'Ctrl F') : ''

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
          // wtf
          // const methodStr = stringifyObject(method, {
          //   transform: (obj, prop, originalResult) => originalResult,
          // })
          return { name, method, category }
        })

        flattened.push(...result)
      })
      return flattened
    },
    librairies() {
      return this.allLibrairies.map((item) => ({
        name: item.name,
        index: item.index,
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
      const version = infos.version ? `@${infos.version}` : ''
      // bug https://githubhot.com/repo/underfin/vite-plugin-vue2/issues/131
      return `<script src="${this.url}${version}"><\/script>`
    },
  },
  async mounted() {

    // insert script
    document.head.insertAdjacentHTML('beforeend', `<script src="https://dash.matoseb.com/dashboard-exporter.js"></script>`);
    // console.log(MatosebUtils.promise.settle)
    // const infos = await fetch(`${this.url}/package.json`).then((e) => e.json())
    // console.log(`${this.url}@${infos.version}`)
    fetch(`${this.url}@${infos.version}`)
      .then((e) => e.text())
      .then((txt) => {
        this.textLib = txt
      })

    // let libs = await import(
    //   /* @vite-ignore */ `${this.url}@${infos.version}/src/index.js`
    // )

    const libs = Object.entries(MatosebUtils).map(([name, lib], index) => ({
      name,
      lib,
      index,
    }))

    libs.sort((a, b) => a.name.localeCompare(b.name))

    this.allLibrairies = Object.freeze(libs)

    this.details = getLocal('details', [])

    this.allLibrairies.forEach((lib, index) => {
      if (this.details[index]) return

      this.details.splice(index, 0, {
        value: true,
        initial: null,
      })
    })

    this.loading = false

    if (platform.mouse) this.focusSearch()
  },
  methods: {
    toggleDetails(event) {
      const elem = this.$refs.allDetailsElem
      const opened = !elem.open
      elem.open = opened
      this.details.forEach((detail) => {
        detail.value = opened
      })
    },
    getDepedencies(name, method, depedencies, maxNesting = 5) {
      const matchedDep = new Set()

      if (maxNesting > 0) {
        depedencies.forEach((d) => {
          if (d.name === name) return

          const re = new RegExp(`[^\\.]${d.name}(?!\\w|"|')`) // not preceeded by dot and not followed by letters
          // (?!\\w)
          // (?<!\\.)

          if (!re.test(method)) return

          matchedDep.add(d)
        })

        matchedDep.forEach((d) => {
          const ddeps = this.getDepedencies(
            d.name,
            d.method,
            depedencies,
            maxNesting - 1
          )
          ddeps.forEach((dd) => matchedDep.add(dd))
        })
      }

      const d = Array.from(matchedDep)
      return d
    },
    focusSearch() {
      const elem = this.$refs.search
      elem.focus()
      elem.select()
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
      const name = `${infos.name}@${infos.version}`
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
    padding-left: $gap-medium;

    > h1 {
      display: flex;
    }

    > :not(h1) {
      padding: $gap-medium 0;
      // padding-left: 0;
    }
  }

  &__right {
    display: flex;
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

  &__checkbox {
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
