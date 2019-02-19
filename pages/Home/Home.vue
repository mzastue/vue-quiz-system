<template>
  <LayoutDefault>
    <DefaultNavigation/>
    <div class="nes-container quiz--not-started">
      <div class="message -left">
        <i class="nes-bcrikko"></i>
        <div class="nes-balloon from-left">
          <p>Are you ready to start a QUIZ?</p>
        </div>
      </div>

      <div class="form">
        <div class="nes-field">
          <label for="name_field">Your name</label>
          <input type="text" id="name_field" class="nes-input">
        </div>

        <button type="button" class="nes-btn is-success">Start</button>
      </div>
    </div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from '../../layout/Default';
import DefaultNavigation from '../../src/components/Navigation';

export default {
  components: {
    LayoutDefault,
    DefaultNavigation,
  }
}
</script>

<style lang="scss" scoped src="./home.scss" />
