<template>
  <Box title="Question">
    {{ value }}
  </Box>
</template>

<script>
import { Box } from '../../NES';

export default {
  name: 'QuizQuestion',

  components: {
    Box,
  },

  props: {
    value: {
      type: String,
      required: true,
    }
  },

  mounted() {
    this.$emit('rendered');
  },

  updated() {
    this.$emit('rendered');
  }
}
</script>
