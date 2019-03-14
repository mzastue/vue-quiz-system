<template>
  <div class="ops">
    <i class="nes-kirby"></i>
    <Box>
      Ops! You are not allowed to see this page!
    </Box>

    <router-link :to="{ name: 'home' }" class="nes-badge">
      <span class="is-dark">Home</span>
    </router-link>
  </div>
</template>

<script>
import Box from "@/components/NES/Box";

export default {
  components: {
    Box
  }
};
</script>

<style
  scoped
  lang="scss"
  src="./notPermitted.scss"
/>