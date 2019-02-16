<template>
  <Box title="Which one is correct">
    <ul>
      <li
        v-for="(answer, index) in value"
        @click="$emit('clickAnswer', { answerNo: index + 1 })"
      ><button type="button" class="nes-btn">{{ answer }}</button></li>
    </ul>
  </Box>
</template>

<script>
import { Box } from '../../NES';

export default {
  components: {
    Box,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    }
  }
}
</script>

<style scoped lang="scss" src="./answers.scss" />
