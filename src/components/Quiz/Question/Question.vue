<template>
  <div class="question">
    <h2>{{ question }}</h2>
    <ul>
      <li
        v-for="option in options"
        @click="$emit('clickAnswer', { answerId: option.id })"
      >{{ option.answer }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      default: 'No question asked',
      required: true,
    },

    options: {
      type: Array,
      default: () => [{}],
      required: true,
    }
  }
}
</script>

<style lang="css">
</style>
