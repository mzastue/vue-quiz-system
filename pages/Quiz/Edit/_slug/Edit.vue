<template>
  <DetailLayout fluid :isLoading="isLoading" :isError="errors.fetchingError">
    <span class="nes-text is-disabled">Quiz</span>
    <h1>{{ quizData.quizName }}</h1>
    <main v-if="!isLoading && !errors.fetchingError">
      <CreatorSidebar :questions="quizData.newQuestions" />

      <CreatorWrapper>
        <!-- <Box title="These questions are already created" class="created-questions">
          <ul class="nes-list is-circle">
            <li v-for="(oldQuestion, oldQuestionIndex) in quizData.oldQuestions" :key="`old-question-${oldQuestionIndex}`">
              {{ oldQuestion.text }}
              (Answers: {{ oldQuestion.answersCount }})
            </li>
          </ul>
        </Box> -->

        <QuestionsCreator
          @save="handleSave"
          :questions="quizData.newQuestions"
          :error="errors.newQuestions"
        />
      </CreatorWrapper>
    </main>
  </DetailLayout>
</template>

<script>
import DetailLayout from '../../../../layout/Detail';
import Box from '../../../../src/components/NES/Box';
import Item from '../../../../src/models/Item';
import QuestionsCreator from '../../../../src/components/Creator/Question';
import CreatorSidebar from '../../../../src/components/Creator/Sidebar';
import CreatorWrapper from '@/components/Creator';

export default {
  name: 'PageQuizEdit',

  components: {
    DetailLayout,
    QuestionsCreator,
    Box,
    CreatorSidebar,
    CreatorWrapper,
  },

  props: {
    quiz: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isLoading: true,
      errors: {},
      quizData: {
        oldQuestions: [],
        newQuestions: [],
        quizName: '',
      },
    };
  },

  async created() {
    let quizData = this.quiz;

    if (!quizData.id) {
      const quizId = this.$route.params.slug;
      quizData = await this.axios.get(`/quiz/${quizId}/edit`)
        .then(res => res.data)
        .catch(error => {
          this.errors.fetchingError = true;
        })
        .finally(() => {
          this.isLoading = false;
        })
      ;
    } else {
      this.isLoading = false;
      this.errors.fetchingError = false;
    }

    if (quizData) {
      this.quizData.quizName = quizData.name;
      this.quizData.oldQuestions = quizData.createdQuestions;
      this.quizData.quizId = quizData.id;
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

    handleSave ({ questions }) {
      const quizEditLink = this.$route.params.slug;
      this.axios.put(`/quiz/${quizEditLink}`, {
        newQuestions: questions,
      })
      .then(res => {
        this.quizData.oldQuestions.push(...questions.map(quesion => ({ text: quesion.text, answersCount: quesion.answers.length })));
        this.quizData.newQuestions = [];
      })
      .catch(err => {
        this.errors = {};
        err.response.data.error.forEach(err => {
          this.errors[err.field] = err.message;
        });
      })
    },
  }
}
</script>

<style lang="scss" src="./edit.scss">
