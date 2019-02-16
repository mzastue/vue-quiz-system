<template>
  <div
    class="nes-container"
    :class="{'with-title': title }"
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
    }
  }
}
</script>
