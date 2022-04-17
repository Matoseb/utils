<template lang="pug">
  button.method(
    v-tooltip="string"
    @click="onClick"
  )
    span {{name}}
</template>
<script>
import stringifyObject from 'stringify-object'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    method: {
      required: true,
    },
  },
  computed: {
    string() {
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
    onClick() {
      this.$copyText(this.string).then((e) => {
        this.$awn.success(
          `<span class="method-name">${this.name}</span> copied to clipboard!`,
          {
            durations: { success: 1000 },
            labels: {
              success: '',
            },
          }
        )
      })
    },
  },
}
</script>
<style lang="scss">
.method-name {
  font-style: italic;
}
.method {
  padding: 0.66em;
  color: $color-dark;
  border-radius: 0.33em;

  transition: 0.2s box-shadow;
  cursor: pointer;

  &:hover {
    @include shadow;

    &:active {
      background: $color-dark;
      color: $color-light;
    }
  }
}
</style>
