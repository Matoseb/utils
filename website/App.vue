<template lang="pug">
  #app
    header.header
      h1 @matoseb/utils
    main.libs
      details.libs__modules(
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

</template>
<script>
import MethodComponent from './components/Method.vue'

export default {
  components: {
    Method: MethodComponent,
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
    return { librairies: [] }
  },
  async mounted() {
    let libs = await import('@matoseb/utils/src/')
    // console.log(libs)
    libs = Object.entries(libs).map(([name, lib]) => ({ name, lib }))
    libs.sort((a, b) => a.name.localeCompare(b.name))

    this.librairies = libs
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
.header {
  padding: $gap-medium;
}

.libs {
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
