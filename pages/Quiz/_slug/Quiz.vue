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
            <input type="text" id="name_field" class="nes-input" v-model="playerName">
          </div>

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
      :questions="items"
    />
  </LayoutDefault>
</template>

<script>
import App from '../../../src/App.vue';
import Quiz from "../../../src/components/Quiz/Quiz.vue";
import Item from '../../../src/models/Item';
import LayoutDefault from '../../../layout/Default';

export default {
  name: 'PageQuiz',

  components: {
    Quiz,
    LayoutDefault,
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
      this.isReady = true;
    },
  }
}
</script>

<style lang="scss" scoped src="./quiz.scss" />

