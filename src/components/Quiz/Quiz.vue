<template>
  <div id="quiz">
    <h1>Welcome</h1>
    <h3>Step: {{ currentQuestionIndex + 1 }} / {{ questions.length }}</h3>
    <Question
      @clickAnswer="handleClickAnswer"
      :question="currentQuestion.question"
      :options="currentQuestion.options"
      :key="currentQuestion.question"
    />
    <div v-if="isEnded">
      Ended. Score: {{ score }}
    </div>
  </div>
</template>

<script>
import Question from './Question/Question.vue';

const status = {
  NOT_STARTED: 0,
  STARTED: 1,
  ENDED: 2,
};

export default {
  name: 'QuizQuestion',

  components: {
    Question,
  },

  props: {
    questions: {
      type: Array,
      default: () => [],
      required: true,
    },
  },

  data() {
    return {
      score: 0,
      currentQuestionIndex: 0,
      status: status.NOT_STARTED,
    };
  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },

    isEnded() {
      return this.status === status.ENDED;
    },
  },

  methods: {
    setNextQuestion() {
      this.currentQuestionIndex = this.currentQuestionIndex + 1;
    },

    changeStatus(status) {
      this.status = status;
    },

    hasNextQuestion() {
      const nextQuestionIndex = this.currentQuestionIndex + 1;
      return this.questions.length > nextQuestionIndex
        ? Promise.resolve()
        : Promise.reject();
    },

    updateScore(answerId, currentQuestionIndex) {
      if (this.questions[currentQuestionIndex].correct === answerId) {
        this.score = this.score + 1;
      }
    },

    handleClickAnswer({ answerId }) {
      const currentQuestionIndex = this.currentQuestionIndex;

      this.hasNextQuestion()
        .then(this.setNextQuestion)
        .catch(this.changeStatus.bind(null, status.ENDED))
        .finally(this.updateScore.bind(null, answerId, currentQuestionIndex))
    },
  }
}
</script>

<style lang="css">
</style>
