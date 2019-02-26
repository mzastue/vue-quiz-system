<template>
  <div class="top-bar-item" :class="'align-' + align">
    <div>{{ name }}</div>
    <div>
      <i v-if="icon" class="nes-icon is-small" :class="icon"></i>
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    align: {
      type: String,
      default: 'left', // left|center|right
      required: false,
    },

    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      required: false,
    },
  }
}
</script>
