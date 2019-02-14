<template>
  <div class="text-media margin-bottom--lg">
  <div class="text-media__text">
    <div class="text-media__text-inner">
      <div class="text-component">
        <slot name="text"></slot>
      </div>
    </div>
  </div>

  <div class="text-media__media">
    <figure>
      <svg width="620" height="420" viewBox="0 0 620 420" preserveAspectRatio="xMinYMin slice">
        <rect width="620" height="420" fill="var(--color-contrast-lower)"/>
        <path d="M216 272L333 155L403.2 272H216Z" fill="var(--color-contrast-low)"/>
        <path d="M239.8 178.8C252.723 178.8 263.2 168.323 263.2 155.4C263.2 142.477 252.723 132 239.8 132C226.877 132 216.4 142.477 216.4 155.4C216.4 168.323 226.877 178.8 239.8 178.8Z" fill="var(--color-contrast-low)"/>
      </svg>
    </figure>
  </div>
</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped src="./box.scss" />
