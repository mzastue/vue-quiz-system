<template>
  <LayoutDefault sm>
    <div id="home" class="nes-container">
      <h1>NES Quiz</h1>
      <div class="nav">
        <div class="nav--item" v-for="(navItem, navIndex) in nav" :key="`nav-item-${navIndex}`">
          <span class="nes-text" @click="handleClick(navItem)">{{ navItem.label }}</span>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from '../../layout/Default';
import DefaultNavigation from '../../src/components/Navigation';

export default {
  components: {
    LayoutDefault,
    DefaultNavigation,
  },

  data () {
    return {
      nav: [
        {
          label: 'Start new game',
          hrefName: 'quiz-pre',
        },
        {
          label: 'Create quiz',
          hrefName: 'quiz-create',
        },
        {
          label: 'Edit quiz',
          hrefName: 'quiz-pre-edit',
        },
      ],
    }
  },

  methods: {
    handleClick (navItem) {
      this.$router.push({ name: navItem.hrefName });
    }
  }
}
</script>

<style lang="scss" scoped src="./home.scss" />
