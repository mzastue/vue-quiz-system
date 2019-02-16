<template>
  <div id="app">
    <Quiz
      :questions="items"
    />
  </div>
</template>

<script>
import rawQuestions from './../questions.json';
import Quiz from "./components/Quiz/Quiz.vue";
import Item from './models/Item';

export default {
  name: "app",

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
            rawQuestion.reference
          );
        });
      ;
    },
  }
};
</script>

<style lang="scss" src="./assets/css/style.scss" />
