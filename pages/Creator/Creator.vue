<template>
  <LayoutDefault fluid>
    <main>
      <CreatorSidebar :questions="questions" />

      <CreatorEditor :questions="questions" @save="handleSave" />
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
    };
  },

  methods: {
    handleSave({ questions }) {
      this.axios.post('/quiz', { questions });
    }
  }
}
</script>

<style lang="scss" src="./creator.scss" />
