<template>
  <Box title="Quiz config">
    <div class="config--item">
      <div>
        <label>
          <input type="checkbox" class="nes-checkbox" v-model="config.questionTimeLimitEnabled" />
          <span>Set time limit per question (in seconds)</span>
        </label>
      </div>
      <div>
        <input
          id="name_field"
          type="number"
          class="nes-input"
          placeholder="Seconds"
          min=0
          step=1
          v-model.number="config.questionTimeLimitValue"
          :disabled="!config.questionTimeLimitEnabled"
        >
      </div>
    </div>
  </Box>
</template>

<script>
import Box from '@/components/NES/Box';
export default {
  name: "QuizConfig",

  components: {
    Box,
  },

  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
  input:disabled {
    background-color: #adafbc
  }
</style>
