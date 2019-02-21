<template>
  <LayoutDefault fluid>
    <main>
      <CreatorSidebar :questions="questions" />

      <CreatorEditor
        @save="handleSave"
        :quizName="quizName"
        :questions="questions"
        :error="errors"
      />
    </main>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from '../../layout/Default';
import Box from '../../src/components/NES/Box';
import CreatorSidebar from '../../src/components/Creator/Sidebar';
import CreatorEditor from '../../src/components/Creator/Editor';

export default {
  components: {
    LayoutDefault,
    Box,
    CreatorSidebar,
    CreatorEditor,
  },

  data() {
    return {
      quizName: '',
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
    handleSave({ questions, quizName }) {
      this.axios.post('/quiz', {
        quizName,
        questions,
      })
        .then(res => {
          this.errors = {};
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
