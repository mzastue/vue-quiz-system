<template>
  <div
    class="nes-container box"
    :class="{
      'with-title': title,
      'is-error': isError,
    }"
  >
    <h1 v-if="title" class="title">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "nes--box",

  props: {
    title: {
      type: String,
      required: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style scoped lang="scss" src="./box.scss" />
