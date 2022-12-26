<template lang="pug">
button.method(
  v-tooltip="text"
  :data-name="name"
  :data-deps="deps"
  @click="onGetAll"
)
  span {{name}}
</template>
<script>
import Vue from 'vue'
import stringifyObject from 'stringify-object'
import Clipboard from './Clipboard.vue'

export default {
  extends: Clipboard,
  props: {
    method: {
      required: true,
    },
    text: {
      required: false,
    },
    depedencies: {
      required: false,
    },
  },
  beforeCreate() {
    Vue.delete(this.$options.props, 'text')
  },
  mounted() {
    const highlightAll = (enable) => {
      this.depedencies.forEach((d) => {
        const e = document.querySelector(`.method[data-name="${d.name}"]`)
        if (e) e.classList.toggle('--highlight', enable)
      })
    }

    this.$el.onmouseenter = () => highlightAll(true)
    this.$el.onmouseleave = () => highlightAll(false)
  },
  computed: {
    deps() {
      return this.depedencies.map((d) => d.name).join(' ')
    },
    text() {
      const declaration =
        typeof this.method === 'function' ? '' : `const ${this.name} = `
      return (
        declaration +
        stringifyObject(this.method, {
          transform: (obj, prop, originalResult) => {
            return originalResult
          },
        })
      )
    },
  },
  methods: {
    onGetAll() {
      const parts = []

      if (document.body.classList.contains('--highlight-deps'))
        this.depedencies.forEach((d) => {
          parts.push(d.method)
        })

      if (parts.length) {
        const separator = '-'.repeat(10)
        parts.unshift(`//#region depedencies for ${this.name} ${separator}`)
        parts.push(`//#endregion ${separator}`)
      }

      parts.push(this.text)

      this.copy(parts.join('\n\n'))
    },
  },
}
</script>
<style lang="scss">
.method {
  @include button;

  @at-root.--highlight-deps &.--highlight {
    @include shadow;
    @include inverse;
  }
}
</style>
