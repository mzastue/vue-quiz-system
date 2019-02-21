<template>
  <div class="editor">
    <Box title="Quiz name">
      <div class="nes-field">
        <input
          type="text"
          id="name_field"
          class="nes-input"
          :class="{'is-error': error.quizName }"
          :placeholder="error.quizName"
          v-model="formData.quizName"
        >
      </div>
    </Box>

    <Box title="Questions" :is-error="Boolean(error.questions)">
      <div class="question nes-container with-title nes-field"
        v-for="(question, questionIndex) in formData.questions"
        :key="'question' + questionIndex"
      >
      <h1 class="title">Question {{ questionIndex + 1}}</h1>
        <input
          id="name_field"
          type="text"
          class="nes-input"
          placeholder="Question text"
          v-model="question.text"
        >

        <div class="answers"
          v-for="(answer, answerIndex) in question.answers"
          :key="'answer-' + answerIndex"
        >
          <Answer
            :answer="answer"
            :correctAnswer="question.correctAnswer"
          />
        </div>

        <div class="controls">
          <button
            type="button"
            class="nes-btn is-warning"
            @click="handleAddAnswer(question)"
          >Add answer</button>
        </div>
      </div>

      <div class="controls">
        <button
          type="button"
          class="nes-btn is-primary"
          @click="handleAddQuestion()"
        >Add question</button>
      </div>
    </Box>

    <button class="nes-btn is-success" @click="handleSaveQuestions">Save</button>
  </div>
</template>

<script>
import { Box } from '../../NES';
import Answer from './Answer';

export default {
  components: {
    Box,
    Answer,
  },

  props: {
    quizName: String,
    questions: Array,
    error: Object,
  },

  data() {
    return {
      formData: {
        questions: this.questions,
        quizName: this.quizName,
      },
    };
  },

  methods: {
    handleAddQuestion() {
      this.formData.questions.push(this.createEmptyQuestion());
    },

    handleAddAnswer(question) {
      question.answers.push(this.createEmptyAnswer());
    },

    createEmptyQuestion() {
      return {
        text: '',
        answers: [],
        correctAnswer: this.createEmptyAnswer(),
      };
    },

    createEmptyAnswer() {
      return {
        text: '',
        isCorrect: false,
      };
    },

    handleSaveQuestions() {
      const notEmptyAnswerFilter = answer => answer.text.length;

      const questions = this.formData.questions.map(question => {
        const answers = question.answers.filter(notEmptyAnswerFilter);
        return {
          ...question,
          answers,
        }
      });

      this.$emit('save', {
        quizName: this.formData.quizName,
        questions,
      });
    },
  }
}
</script>

<style lang="scss" scoped src="./editor.scss" />
