<template>
  <Box title="Quiz name">
    <div class="nes-field">
      <input
        type="text"
        id="name_field"
        class="nes-input"
        :class="{'is-error': error }"
        :placeholder="error"
        :value="value"
        @input="$emit('input', $event.target.value)"
      >
    </div>
  </Box>
</template>

<script>
import Box from '@/components/NES/Box';
export default {
  name: "QuizName",

  components: {
    Box,
  },

  props: {
    value: String,
    error: String,
  },
}
</script>

<style>

</style>
