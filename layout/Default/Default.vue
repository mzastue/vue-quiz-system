<template>
  <div
    class="container"
    :class="{
      'container--xxl': fluid,
      'container--md': md,
      'container--sm': sm,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    fluid: {
      type: Boolean,
      default: false,
    },

    md: {
      type: Boolean,
      default: false,
    },

    sm: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped src="./default.scss" />
