<template>
  <section id="quiz" class="container container--md">

    <header class="top-bar">
      <TopBarItem name="SCORE" :value="score | pad" />

      <TopBarItem name="ROUND" :value="round" align="center" />

      <TopBarItem name="TIME" value="121" align="right" />
    </header>

    <main class="nes-container">
      <h1>QUIZ</h1>
      <Question v-model="currentQuestion.question" />
      <Answers
        @clickAnswer="handleClickAnswer"
        v-model="currentQuestion.answers"
      />
    </main>

    <footer>
      Footer
    </footer>
  </section>
</template>

<script>
import { TopBarItem } from '../NES';
import Question from './Question';
import Answers from './Answers';

const status = {
  NOT_STARTED: 0,
  STARTED: 1,
  ENDED: 2,
};

export default {
  name: 'QuizQuestion',

  components: {
    Question,
    Answers,
    TopBarItem,
  },

  filters: {
    pad (value, size = 3) {
      let formatted = value.toString();
      while (formatted.length < size) {
        formatted = "0" + formatted;
      }
      return formatted.toString();
    }
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
      // config,
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

    round() {
      const currentRound = this.currentQuestionIndex + 1;
      const totalRounds = this.questions.length;

      return `${currentRound} / ${totalRounds}`;
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

    updateScore(isCorrect) {
      if (isCorrect) {
        this.score = this.score + 1;
      }
    },

    handleClickAnswer({ answerNo }) {
      const currentItem = this.questions[this.currentQuestionIndex];
      currentItem.checkAnswer(answerNo);

      this.hasNextQuestion()
        .then(this.setNextQuestion)
        .catch(this.changeStatus.bind(null, status.ENDED))
        .finally(this.updateScore.bind(null, currentItem.isAnswerCorrect))
    },
  }
}
</script>

<style lang="scss" src="./quiz.scss" />
