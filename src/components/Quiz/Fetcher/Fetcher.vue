<template>
  <div id="quiz-fetcher">
    <div class="notification" v-if="notification.occured">
      <span class="nes-text"
        :class="notificationClassName"
      >{{ notification.message }}</span>
    </div>
    <Box :title="title">
      <div class="nes-field is-inline">
        <input type="text" id="name_field" class="nes-input" v-model="id">
        <button class="nes-btn is-primary" @click="handleClick()">Give me a quiz</button>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/NES/Box';

export default {
  name: 'QuizFetcher',

  components: {
    Box,
  },

  props: {
    endpoint: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      id: '',
      notification: {
        occured: false,
        status: undefined,
        className: {
          'is-error': this.isError,
        },
        message: '',
      },
    };
  },

  computed: {
    notificationClassName() {
      return {
        'is-error': this.isError,
      };
    },
    isError() {
      return [404, 500].indexOf(this.notification.status) !== -1;
    }
  },

  methods: {
    handleClick() {
      const id = this.id;
      const endpoint = this.endpoint.replace('##ID##', id);

      this.notification.occured = true;
      this.notification.message = "Fetching quiz..";

      this.axios(endpoint)
        .then(response => {
          this.notification.occured = false;
          this.$emit('fetched', {
            quiz: response.data,
            searchValue: id,
          })
        })
        .catch(err => {
          const resStatus = err.response.status;
          this.notification.message = err.response.data;
          this.notification.status = err.response.status;

          if (resStatus === 404) {
            this.notification.message = 'We are sorry. Quiz you looking for does not exists.';
          }

          this.notification.occured = true;
        });
      ;
    }
  }
}
</script>

<style lang="scss" src="./fetcher.scss" scoped />
