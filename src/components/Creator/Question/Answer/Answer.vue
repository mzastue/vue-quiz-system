<template>
  <div class="answer nes-field is-inline">
    <input type="text" id="inline_field" class="nes-input" placeholder="Answer" v-model="answer.text">
    <label>
      <input type="radio" class="nes-radio" :value="answer.text" v-model="correctAnswer.text" />
      <span>Correct</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    answer: Object,
    correctAnswer: Object,
  },

  watch: {
    'correctAnswer.text'() {
      this.answer.isCorrect = this.answer.text === this.correctAnswer.text;
    },
  }
}
</script>
