<template>
  <LayoutDefault>
    <template v-if="isLoading">
      Fetching quiz..
    </template>
    <template v-if="isError">
      Quiz not found
    </template>
    <div class="container container--md" v-if="!isLoading && !isError && !isReady">
      <div class="nes-container quiz--not-started">
        <div class="message -left">
          <i class="nes-bcrikko"></i>
          <div class="nes-balloon from-left">
            <p>Are you ready <span class="nes-text is-primary">{{ playerName }}</span> to start <span class="nes-text is-primary">{{ quizName }}</span> QUIZ?</p>
          </div>
        </div>

        <form class="form">
          <div class="nes-field">
            <label for="name_field">Your name</label>
            <input type="text" id="name_field" class="nes-input" v-model="playerName" placeholder="I am just anonymous">
          </div>

          <Box title="Settings">
            <label for="questions_amount">How many questions?</label>
            <div class="nes-field is-inline">
              <input
                type="number"
                id="questions_amount"
                class="nes-input"
                v-model.number="quizConfig.questionsAmount"
                step="1"
                min="1"
                :max="quizConfig.questionsCount"
              >
              &nbsp;<span>/&nbsp;{{ quizConfig.questionsCount }}</span>
            </div>

            <label for="question_time_limit">Time limit for question (seconds)</label>
            <div class="nes-field">
              <input
                id="question_time_limit"
                type="number"
                class="nes-input"
                placeholder="Seconds"
                min="0"
                step="1"
                v-model.number="quizConfig.timeForAnswer"
                :disabled="!quizConfig.isTimeLimit"
              >
              <label>
                <input
                  type="checkbox"
                  class="nes-checkbox"
                  v-model="quizConfig.isTimeLimit"
                />
                <span>Enable</span>
              </label>
            </div>
          </Box>

          <button
            @click.prevent="handleStart"
            type="submit"
            class="nes-btn is-success"
          >Start</button>
        </form>
      </div>
    </div>
    <Quiz
      v-if="isReady"
      :playerName="playerName"
      :questions="questions"
      :config="quizConfig"
    />
  </LayoutDefault>
</template>

<script>
import App from '../../../src/App.vue';
import Quiz from "../../../src/components/Quiz/Quiz.vue";
import Item from '../../../src/models/Item';
import LayoutDefault from '../../../layout/Default';
import Box from '@/components/NES/Box';

import QuizConfig from '@/models/QuizConfig';
import defaultConfig from './../../../config';
import shuffleArray from '@/utils/shuffleArray';

export default {
  name: 'PageQuiz',

  components: {
    Quiz,
    LayoutDefault,
    Box,
  },

  props: {
    quizData: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isLoading: false,
      isError: false,
      items: [],
      quizName: '',
      playerName: '',
      isReady: false,
      quizConfig: new QuizConfig(),
      questions: [],
    }
  },

  async created() {
    let quizData = this.quizData;

    if (!quizData.id) {
      const quizId = this.$route.params.slug;
      quizData = await this.axios.get(`/quiz/${quizId}`)
        .then(res => {
          this.isLoading = false;
          return res.data;
        })
        .catch(error => {
          this.isError = true;
        })
      ;
    }

    if (quizData) {
      this.quizName = quizData.name;
      this.items = this.createItems(quizData.questions);
      this.quizConfig.setQuestionsCount(quizData.config.questionsCount);
      this.quizConfig.setQuestionsTimeLimit(quizData.config.isQuestionTimeLimitEnabled);
      this.quizConfig.setQuestionTimeLimitValue(quizData.config.questionTimeLimit);
    }
  },

  methods: {
    createItems (rawQuestions) {
      return rawQuestions
        .map(rawQuestion => {
          return new Item(
            rawQuestion.text,
            rawQuestion.answers,
            rawQuestion.correct,
            rawQuestion.explanations
          );
        });
      ;
    },

    handleStart () {
      const shuffledItems = shuffleArray(this.items);
      this.questions = shuffledItems.slice(0, this.quizConfig.questionsAmount);
      this.isReady = true;
    },
  }
}
</script>

<style lang="scss" scoped src="./quiz.scss" />

