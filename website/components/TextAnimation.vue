<template lang="pug">
  span {{text}}
</template>
<script>
export default {
  props: {
    interval: {
      type: Number,
      default: 500,
    },
    frames: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      intervalCache: null,
    }
  },
  computed: {
    text() {
      return this.frames[this.index]
    },
  },
  mounted() {
    this.intervalCache = setInterval(() => {
      this.index = (this.index + 1) % this.frames.length
    }, this.interval)
  },
  beforeDestroy() {
    clearInterval(this.intervalCache)
  },
}
</script>
<style lang="scss"></style>
