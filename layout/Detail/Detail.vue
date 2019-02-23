<template>
  <DefaultLayout :fluid="fluid">
    <template v-if="isLoading">
      Fetching quiz..
    </template>
    <template v-if="isError">
      Quiz not found
    </template>

    <slot></slot>
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
</style>
