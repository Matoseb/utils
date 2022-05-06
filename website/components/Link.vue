<template lang="pug">
a.link(
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
.link {
  @include button;

  text-decoration: underline;
}
</style>
