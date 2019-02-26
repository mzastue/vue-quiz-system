<template>
  <div class="sidebar">
    <Box title="Quesions list">
      <ul class="nes-list is-disc sidebar--questions-list" v-if="questions.length">
        <li v-for="(question, index) in questions" :key="'question' + index">{{ question.text }}</li>
      </ul>
      <span v-else>Empty</span>
    </Box>
  </div>
</template>

<script>
import { Box } from '../../NES';
export default {
  components: {
    Box,
  },

  props: {
    questions: Array,
  },
}
</script>

<style lang="scss" scoped src="./sidebar.scss" />
