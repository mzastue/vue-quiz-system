<template>
  <section id="quiz" class="container container--md">
    <header>
      <div class="top-bar">
        <TopBarItem name="SCORE" :value="score | pad" />

        <TopBarItem name="ROUND" :value="round" align="center" />

        <TopBarItem name="TIME" :value="timeAmontValue.toString() | pad" align="right" />
      </div>

      <QuizTimer v-if="config.timeLimit !== false"
        @events="setTimerEvents"
        @timesUp="handleTimerTimesUp"
        :start="0"
        :max="config.timeForAnswer"
      />
    </header>

    <main class="nes-container">
      <h1>QUIZ</h1>
      <Question @rendered="handleQuestionShowUp" v-model="currentQuestion.question" />
      <Answers
        @clickAnswer="handleClickAnswer"
        v-model="currentQuestion.answers"
      />
    </main>

    <footer>
      <QuizFooter />
    </footer>
  </section>
</template>

<script>
import config from './../../../config';
import { TopBarItem } from '../NES';
import Question from './Question';
import Answers from './Answers';
import QuizFooter from './Footer'
import QuizTimer from './Timer';

const status = {
  NOT_STARTED: 0,
  STARTED: 1,
  ENDED: 2,
};

export default {
  name: 'Quiz',

  components: {
    Question,
    Answers,
    TopBarItem,
    QuizFooter,
    QuizTimer,
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
      config,
      score: 0,
      timeAmontValue: 0,
      currentQuestionIndex: 0,
      status: status.NOT_STARTED,
      timerEvents: {},
    };
  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },

    isEnded() {
      return this.status === status.ENDED;
    },

    isStarted() {
      return this.status === status.STARTED;
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

    handleClickAnswer({ answerNo } = {}) {
      const currentItem = this.questions[this.currentQuestionIndex];
      currentItem.checkAnswer(answerNo);

      if (this.config.timeLimit) {
        this.timerEvents.reset();
      }

      this.hasNextQuestion()
        .then(this.setNextQuestion)
        .catch(this.changeStatus.bind(null, status.ENDED))
        .finally(this.updateScore.bind(null, currentItem.isAnswerCorrect))
    },

    setTimerEvents(events) {
      this.timerEvents = events;
    },

    handleQuestionShowUp() {
      if (this.config.timeLimit) {
        this.timerEvents.start();
      }
    },

    handleTimerTimesUp() {
      setTimeout(this.handleClickAnswer.bind(null, {}), 500);
    }
  }
}
</script>

<style lang="scss" src="./quiz.scss" />
