<template>
  <h3>Score: {{ score }}</h3>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0,
    },
  },
}
</script>
