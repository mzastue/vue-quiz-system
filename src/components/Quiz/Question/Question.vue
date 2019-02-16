<template>
  <Box title="Question">
    {{ value }}
  </Box>
</template>

<script>
import { Box } from '../../NES';

console.log(Box);

export default {
  components: {
    Box,
  },

  props: {
    value: {
      type: String,
      required: true,
    }
  }
}
</script>
