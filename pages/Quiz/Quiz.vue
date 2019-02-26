<template>
  <LayoutDefault md id="page--quiz-pre">
    <QuizFetcher
      @fetched="handleFetchSuccess"
      title="Give me a quiz ID"
      endpoint="/quiz/##ID##"
    />
  </LayoutDefault>
</template>

<script>
import LayoutDefault from '../../layout/Default';
import QuizFetcher from '@/components/Quiz/Fetcher';

export default {
  name: 'PageQuizPre',

  components: {
    LayoutDefault,
    QuizFetcher,
  },

  methods: {
    handleFetchSuccess ({ quiz }) {
      this.$router.push({
        name: 'quiz-start',
        params: {
          slug: quiz.id,
          quizData: quiz,
        },
      });
    }
  }
}
</script>

<style lang="scss" src="./quiz.scss" />
