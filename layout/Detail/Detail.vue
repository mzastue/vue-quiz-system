<template>
  <DefaultLayout :fluid="fluid">
    <template v-if="isLoading">
      Fetching quiz..
    </template>
    <template v-if="isError">
      Quiz not found
    </template>

    <div v-if="!isLoading && !isError">
      <div class="nav">
        <span class="nes-text"><router-link :to="{ name: 'home' }">&#60; Back home</router-link></span>
      </div>
      <slot></slot>
    </div>

  </DefaultLayout>
</template>

<script>
import DefaultLayout from './../Default';

export default {
  components: {
    DefaultLayout,
  },

  props: {
    fluid: {
      type: Boolean,
      default: false,
    },

    isError: {
      type: Boolean,
      default: false,
    },

    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
  .nav {
    margin-bottom: 20px;
  }
</style>
