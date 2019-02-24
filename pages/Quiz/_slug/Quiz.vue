<template>
  <LayoutDefault>
    <template v-if="isLoading">
      Fetching quiz..
    </template>
    <template v-if="isError">
      Quiz not found
    </template>
    <div class="container container--md" v-if="!isLoading && !isError">
      <div class="nes-container quiz--not-started">
        <div class="message -left">
          <i class="nes-bcrikko"></i>
          <div class="nes-balloon from-left">
            <p>Are you ready <span class="nes-text is-primary">{{ userName }}</span> to start <span class="nes-text is-primary">{{ quizName }}</span> QUIZ?</p>
          </div>
        </div>

        <div class="form">
          <div class="nes-field">
            <label for="name_field">Your name</label>
            <input type="text" id="name_field" class="nes-input" v-model="userName">
          </div>

          <button type="button" class="nes-btn is-success">Start</button>
        </div>
      </div>
    </div>
  </LayoutDefault>
  <!-- <Quiz
    :questions="items"
  /> -->
</template>

<script>
// import rawQuestions from '../../questions.json';
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
      // rawQuestions: [],
      items: [],
      quizName: '',
      userName: '',
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

<style lang="scss" scoped src="./quiz.scss" />

