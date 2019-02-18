<template>
  <div class="container container--md">
    <DefaultNavigation />
    <slot></slot>
  </div>
</template>

<script>
import DefaultNavigation from './Navigation';

export default {
  components: {
    DefaultNavigation,
  },
}
</script>

<style lang="scss" scoped src="./default.scss" />
