<template>
  <div id="quiz">
    <h1>Welcome</h1>
    <WithSteps v-if="config.showSteps" :current="currentQuestionIndex + 1" :total="questions.length" />
    <WithScore v-if="config.showScore" :score="score" />
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
import config from './config';
import Question from './Question/Question.vue';
import WithScore from './WithScore/WithScore.vue';
import WithSteps from './WithSteps/WithSteps.vue';

const status = {
  NOT_STARTED: 0,
  STARTED: 1,
  ENDED: 2,
};

export default {
  name: 'QuizQuestion',

  components: {
    Question,
    WithScore,
    WithSteps,
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
      config,
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
