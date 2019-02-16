<template>
  <div class="top-bar-item" :class="'align-' + align">
    <div>{{ name }}</div>
    <div>{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    align: {
      type: String,
      default: 'left', // left|center|right
      required: false,
    },

    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },
  }
}
</script>
