<template>
  <LayoutDefault md id="page--quiz-pre-edit">
    <QuizFetcher
      @fetched="handleFetchSuccess"
      title="Give me a quiz edit referer"
      endpoint="/quiz/##ID##/edit"
    />
  </LayoutDefault>
</template>

<script>
import LayoutDefault from '../../../layout/Default';
import QuizFetcher from '@/components/Quiz/Fetcher';

export default {
  name: 'PageEditPre',

  components: {
    LayoutDefault,
    QuizFetcher,
  },

  methods: {
    handleFetchSuccess ({ quiz, searchValue }) {
      this.$router.push({
        name: 'quiz-edit',
        params: {
          slug: searchValue,
          quiz: {
            id: quiz.id,
            quizName: quiz.name,
            oldQuestions: quiz.createdQuestions,
          },
        },
      });
    },
  }
}
</script>

<style lang="scss" src="./edit.scss" />
