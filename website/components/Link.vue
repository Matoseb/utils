<template lang="pug">
a(
  v-bind="attr"
)
  slot
</template>
<script>
export default {
  props: {
    external: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    attr() {
      let external

      if (this.external)
        external = {
          target: '_blank',
          rel: 'noopener noreferrer',
        }

      return {
        ...external,
      }
    },
  },
}
</script>
<style lang="scss">
a {
  cursor: pointer;
  text-decoration: underline;
}
</style>
