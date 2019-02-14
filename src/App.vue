<template>
  <div id="app">
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

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
