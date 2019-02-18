<template>
  <Quiz
    :questions="items"
  />
</template>

<script>
import rawQuestions from '../../questions.json';
import App from '../../src/App.vue';
import Quiz from "../../src/components/Quiz/Quiz.vue";
import Item from '../../src/models/Item';

export default {
  components: {
    Quiz,
  },

  data() {
    return {
      items: this.createItems(),
    }
  },

  methods: {
    createItems () {
      return rawQuestions
        .map(rawQuestion => {
          return new Item(
            rawQuestion.question,
            rawQuestion.answers,
            rawQuestion.correct,
            rawQuestion.explanations
          );
        });
      ;
    },
  }
}
</script>
