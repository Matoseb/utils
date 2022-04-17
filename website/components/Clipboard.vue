<template lang="pug">
  .clipboard(
    @click="onClick"
  )
    span {{name}}
</template>
<script>
// import stringifyObject from 'stringify-object'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    text: {
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$copyText(this.text).then((e) => {
        this.$awn.success(
          `<span class="clipboard-name">${this.name}</span> copied to clipboard!`,
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
.clipboard-name {
  font-style: italic;
}
.clipboard {
  text-decoration: underline;
  cursor: pointer;
}
</style>
