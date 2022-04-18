<template lang="pug">
  #app
    header.header
      h1
        Clipboard(
          name="@matoseb/utils"
          :text="textString"
        )
      span.header__version(v-if="infos.version") {{" v" + infos.version}}
    main.libs
      .libs__loading(v-if="loading")
        | Loading package from unpkg.com
        TextAnimation(
          :interval="200"
          :frames="['.', '..', '...']"
        )
      details.libs__modules(
        v-else
        v-for="(item, index) in librairies"
        open
      )
        summary.libs__modules__summary
          h2 {{item.name}}
          //- Method(
          //-   :name="item.name"
          //-   v-bind="toObject(item)"
          //- )
        .libs__modules__items
          Method.libs__modules__items-item(
            v-for="([name, method], index) in getMethod(item)"
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
          Link(href="https://unpkg.com/@matoseb/utils" external) unpkg
        li
          Link(href="https://www.buymeacoffee.com/sebastien.matos" external) donate
</template>
<script>
import MethodComponent from './components/Method.vue'
import Clipboard from './components/Clipboard.vue'
import Link from './components/Link.vue'
import TextAnimation from './components/TextAnimation.vue'

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
      librairies: [],
      loading: true,
      infos: { version: null },
    }
  },
  computed: {
    textString() {
      const version = this.infos.version ? `@${this.infos.version}` : ''
      // bug https://githubhot.com/repo/underfin/vite-plugin-vue2/issues/131
      return `<script src="${this.url}${version}"><\/script>`
    },
  },
  async mounted() {
    const infos = await fetch(`${this.url}/package.json`).then((e) => e.json())

    let libs = await import(
      /* @vite-ignore */ `${this.url}@${infos.version}/src/index.js`
    )
    libs = Object.entries(libs).map(([name, lib]) => ({ name, lib }))
    libs.sort((a, b) => a.name.localeCompare(b.name))

    this.librairies = libs
    this.infos = infos

    this.loading = false
  },
  methods: {
    toObject(item) {
      const lib = this.getMethod(item)
      return { name: item.name, method: Object.fromEntries(lib) }
    },
    getMethod(item) {
      const { lib, name } = item
      const methods = []

      if (lib[Symbol.toStringTag] === 'Module') {
        methods.push(
          ...Object.entries(lib).map(([name, method]) => {
            return [name, method]
          })
        )
      } else {
        methods.push([name, lib])
      }

      return methods
    },
  },
}
</script>
<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  padding: $gap-medium;
  position: sticky;
  top: 0;
  background-color: $color-light;
  z-index: 100;
  flex: 0 0 auto;
}

.footer {
  flex: 0 0 auto;
  padding: $gap-medium;

  &__links {
    display: flex;
    gap: 1em;

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
