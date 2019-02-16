<template>
  <Box title="Which one is correct">
    <ul>
      <li
        v-for="(answer, index) in value"
        @click="$emit('clickAnswer', { answerNo: index + 1 })"
      ><button type="button" class="nes-btn" :class="'is-' + buttonClass(index)">{{ answer }}</button></li>
    </ul>
  </Box>
</template>

<script>
import { Box } from '../../NES';

const buttonClassStates = [
  'primary',
  'success',
  'error',
  'warning',
];

export default {
  components: {
    Box,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {
      randomNumber: 0,
    };
  },

  mounted() {
    this.setRandomQuestionNumber();
  },

  updated() {
    this.setRandomQuestionNumber();
  },

  methods: {
    buttonClass(index) {
      return buttonClassStates[(index + this.randomNumber) % buttonClassStates.length];
    },

    setRandomQuestionNumber() {
      this.randomNumber = parseInt((Math.random() * buttonClassStates.length), 10);
    },
  },
}
</script>

<style scoped lang="scss" src="./answers.scss" />
