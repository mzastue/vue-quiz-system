<template>
  <LayoutDefault>
    <div class="wrapper">
      <template v-if="editLink">
        <div class="fun">
          <i class="nes-icon star is-small"></i>
          <i class="nes-icon star"></i>
          <i class="nes-icon star is-medium"></i>
          <i class="nes-icon star is-large"></i>
          <i class="nes-icon star is-medium"></i>
          <i class="nes-icon star"></i>
          <i class="nes-icon star is-small"></i>
        </div>
        <Box title="Quiz created">
          <h1>Thank you!</h1>
          <h2>You can edit QUIZ <router-link :to="linkData">here</router-link></h2>

          <p>Copy link and collaborate editing this quiz with friends</p>
          <div class="nes-container is-rounded pre">
            <p>{{ editFullPath }}</p>
          </div>

          <p>Copy this link and start QUIZ right now ;)</p>
          <div class="nes-container is-rounded pre">
            <p>{{ quizFullPath }}</p>
          </div>

          <p>Someone will <b>be able to</b></p>
          <ul class="nes-list is-disc">
            <li>see questions, but without answers,</li>
            <li>add his/her own questions with answers</li>
          </ul>
          <p>And <b>not able to</b></p>
          <ul class="nes-list is-disc">
            <li>delete questions,</li>
            <li>change quiz name,</li>
            <li>change quiz settings.</li>
          </ul>
        </Box>
        <div class="nav">
          <button type="button" class="nes-btn is-primary" @click="$router.replace({ name: 'home' })">
            Home
          </button>
          <button type="button" class="nes-btn is-primary" @click="$router.replace({ name: 'quiz-create' })">
            Create another QUIZ
          </button>
        </div>
      </template>
      <div v-else>
        <div class="ops">
          <i class="nes-kirby"></i>
          <Box>
            Ops! You are not allowed to see this page!
          </Box>

          <router-link :to="{ name: 'home' }" class="nes-badge">
            <span class="is-dark">Home</span>
          </router-link>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from '../../../layout/Default';
import Box from '@/components/NES/Box';

export default {
  name: 'PageCreatorResult',

  components: {
    LayoutDefault,
    Box,
  },

  data () {
    return {
      editLink: '',
      quizId: '',
      linkData: {
        name: 'quiz-edit',
        params: {
          slug: this.editLink
        }
      }
    }
  },

  computed: {
    editFullPath () {
      return `${window.location.host}/quiz/edit/${this.editLink}`;
    },

    quizFullPath () {
      return `${window.location.host}/quiz/${this.quizId}`;
    },
  },

  created () {
    this.editLink = this.$route.params.editLink;
    this.quizId = this.$route.params.quizId;
  },
}
</script>

<style lang="scss" scoped src="./result.scss" />