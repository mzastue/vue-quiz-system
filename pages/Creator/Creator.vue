<template>
  <Layout fluid>
    <main>
      <CreatorSidebar :questions="questions" />

      <CreatorWrapper>
        <QuizName v-model="quizName" :error="errors.quizName" />
        <QuizConfig :config="quizConfig" />
        <QuestionsCreator
          @save="handleSave"
          :questions="questions"
          :error="errors.questions"
        />
      </CreatorWrapper>
    </main>
  </Layout>
</template>

<script>
import Layout from '../../layout/Detail';
import Box from '../../src/components/NES/Box';
import CreatorSidebar from '../../src/components/Creator/Sidebar';
import QuestionsCreator from '../../src/components/Creator/Question';
import CreatorWrapper from '@/components/Creator';
import QuizName from '@/components/Creator/Name';
import QuizConfig from '@/components/Creator/Config';

export default {
  components: {
    Layout,
    Box,
    CreatorSidebar,
    QuestionsCreator,
    CreatorWrapper,
    QuizName,
    QuizConfig,
  },

  data() {
    return {
      quizName: '',
      quizConfig: {
        questionTimeLimitEnabled: false,
        questionTimeLimitValue: 15,
      },
      questions: [
        /*
        {
          text: '',
          answers: [
            { value: '', isCorrect: false|true }
          ],
        }
        */
      ],
      errors: {
        /*
          field: message,
        */
      },
    };
  },

  methods: {
    handleSave ({ questions }) {
      this.axios.post('/quiz', {
        quizName: this.quizName,
        questions,
        config: this.quizConfig,
      })
        .then(res => {
          this.errors = {};
          this.$router.replace({
            name: 'creator-result',
            params: {
              editLink: res.data.editLink,
              quizId: res.data.id,
            },
          });
        })
        .catch(error => {
          this.errors = {};
          error.response.data.error.forEach(err => {
            this.errors[err.field] = err.message;
          });
        });
      ;
    }
  }
}
</script>

<style lang="scss" src="./creator.scss" />
