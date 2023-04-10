<template lang="pug">
button.method(
  v-tooltip="getText()"
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

function isClass(v) {
  return typeof v === 'function' && /^\s*class\s+/.test(v.toString())
}

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
  },
  methods: {
    getText(elem = this) {
      const cl = isClass(elem.method)

      const isFunc = typeof elem.method === 'function'
      const declaration = isFunc ? '' : `const ${elem.name} = `
      const end = isFunc ? '' : `;`

      const name =
        declaration +
        stringifyObject(elem.method, {
          transform: (obj, prop, originalResult) => {
            return originalResult
          },
        }) +
        end

      // regex to replace name first chars that matches with empty string
      return name.replace(/^class /, `class ${elem.name} `)
    },
    onGetAll() {
      const parts = []

      if (document.body.classList.contains('--highlight-deps'))
        this.depedencies.forEach((d) => {
          parts.push(this.getText(d))
        })

      if (parts.length) {
        const separator = '-'.repeat(10)
        parts.unshift(`// #region dependencies for ${this.name} ${separator}`)
        parts.push(`// #endregion ${separator}`)
      }

      // console.log(this.getText())
      parts.push(this.getText())

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
