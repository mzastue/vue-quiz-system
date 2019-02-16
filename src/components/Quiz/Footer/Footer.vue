<template>
  <div>
    Made with <i class="nes-icon heart is-small"></i> with VueJS | {{ date }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    }
  }
}
</script>

<style lang="css" scoped>
</style>
