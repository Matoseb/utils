<template lang="pug">
span.clipboard(
  @click="copy()"
  v-tooltip="text"
) {{name}}
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
    copy(txt = this.text) {
      this.$copyText(txt).then((e) => {
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
  font-weight: bold;
}
.clipboard {
  @include button;

  text-decoration: underline;
}
</style>
