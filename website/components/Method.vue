<template lang="pug">
  button.method(
    v-tooltip="text"
    @click="onClick"
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
  },
  beforeCreate() {
    Vue.delete(this.$options.props, 'text')
  },
  computed: {
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
}
</script>
<style lang="scss">
.method {
  @include button;
}
</style>
