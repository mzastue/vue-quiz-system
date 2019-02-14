<template>
  <h3>Step: {{ current }} / {{ total }}</h3>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },
  },
}
</script>
