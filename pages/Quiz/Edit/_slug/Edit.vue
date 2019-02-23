<template>
  <DetailLayout fluid :isLoading="isLoading" :isError="isError">
    <main v-if="!isLoading && !isError">
      <CreatorSidebar :questions="quizData.newQuestions" />

      <QuestionsCreator>
        <Box title="Currently created questions">
          <ul class="nes-list is-circle">
            <li v-for="(oldQuestion, oldQuestionIndex) in quizData.oldQuestions" :key="`old-question-${oldQuestionIndex}`">
              {{ oldQuestion.text }}
              (Answers: {{ oldQuestion.answersCount }})
            </li>
          </ul>
        </Box>

        <QuestionsCreator
          @save="handleSave"
          :questions="quizData.newQuestions"
        />
      </QuestionsCreator>
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

  data() {
    return {
      isLoading: false,
      isError: false,
      quizData: {
        oldQuestions: [],
        newQuestions: [],
        quizName: '',
      },
    };
  },

  async created() {
    const quizId = this.$route.params.slug;
    const quizData = await this.axios.get(`/quiz/${quizId}/edit`)
      .then(res => {
        this.isLoading = false;
        return res.data;
      })
      .catch(error => {
        this.isError = true;
      })
    ;

    this.quizData.quizName = quizData.name;
    this.quizData.oldQuestions = quizData.createdQuestions;
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
      console.log(this.quizData.oldQuestions);
    }
  }
}
</script>

<style lang="scss" src="./edit.scss">
