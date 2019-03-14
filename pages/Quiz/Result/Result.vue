<template>
  <LayoutDefault md>
    <div class="wrapper">
      <div v-if="validate()">
        <h1>Congratulations {{ playerName }}</h1>
        <h2>Your score is {{ score }}</h2>
        <div class="controls">
          <router-link :to="playAgainLink" class="nes-badge">
            <span class="is-primary">Play again</span>
          </router-link>

          <router-link :to="{ name: 'home' }" class="nes-badge">
            <span class="is-dark">Home</span>
          </router-link>
        </div>
      </div>

      <NotPermitted v-else />
    </div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from "../../../layout/Default";
import NotPermitted from "@/components/Errors/NotPermitted";

export default {
  components: {
    LayoutDefault,
    NotPermitted,
  },

  props: {
    playerName: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      playAgainLink: {
        name: 'quiz-start',
        slug: this.$route.params.slug,
      }
    }
  },

  methods: {
    validate() {
      return this.score > -1 && this.playerName.length;
    },
  },
};
</script>

<style lang="scss" scoped src="./result.scss" />
