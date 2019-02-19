<template>
  <div
    class="container"
    :class="{
      'container--xxl': fluid,
      'container--md': !fluid
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
  }
}
</script>

<style lang="scss" scoped src="./default.scss" />
