<template>
  <progress
    class="nes-progress is-success"
    :class="{
      'is-warning': isHalfWay,
      'is-error': isRunningOut,
    }"
    :value="progress"
    :max="max"
  ></progress>
</template>

<script>
export default {
  props: {
    start: {
      type: Number,
      required: false,
      default: 0,
    },

    max: {
      type: Number,
      required: false,
      default: 20,
    },
  },

  created() {
    this.$emit('events', {
      start: this.startTimer,
      reset: this.resetTimer,
    });
  },

  data() {
    return {
      value: this.start,
      intervalID: undefined,
    }
  },

  computed: {
    progress() {
      return this.value;
    },

    percentage() {
      return (this.progress / this.max) * 100;
    },

    isRunningOut() {
      return this.percentage >= 75;
    },

    isHalfWay() {
      return this.percentage >= 50;
    }
  },

  watch: {
    value(newValue) {
      if (newValue === this.max) {
        this.stopTimer();
        this.$emit('timesUp');
      }
    }
  },

  methods: {
    startTimer() {
      this.intervalID = setInterval(() => {
        this.value = this.value + 1;
      }, 1000);
    },

    stopTimer() {
      clearInterval(this.intervalID);
    },

    resetTimer() {
      this.stopTimer();
      this.value = this.start;
    },
  },
}
</script>

<style lang="css" scoped>
</style>
