<template>
  <div id="app" class="container container--md">
    <Quiz
      :questions="questions"
    />
  </div>
</template>

<script>
import questions from './../questions.json';
import Quiz from "./components/Quiz/Quiz.vue";

export default {
  name: "app",

  components: {
    Quiz,
  },

  data() {
    return {
      questions,
    }
  },
};
</script>

<style lang="scss" src="./assets/css/style.scss" />
