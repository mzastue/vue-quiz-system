<template>
  <div class="editor">
    <Box title="Questions" :is-error="Boolean(error)">
      <div class="question nes-container with-title nes-field"
        v-for="(question, questionIndex) in formData.questions"
        :key="'question' + questionIndex"
      >
      <h1 class="title">Question {{ questionIndex + 1}}</h1>
        <span
          class="nes-text is-error"
          v-if="question.status === 2"
        >
          Will be deleted. Reason: {{ question.errorMessage }}
        </span>
        <input
          id="name_field"
          type="text"
          class="nes-input"
          :class="{
            'is-error': question.status === 2,
            'is-success': question.status === 1,
          }"
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

    <button
      @click="handleSaveQuestions"
      class="nes-btn"
      :class="{
        'is-success': saveButton.status.code === 1,
        'is-warning': saveButton.status.code === 0,
      }"
    >{{ buttonText }}</button>
    <span style="margin-left: 20px;" class="nes-text is-error" v-if="saveButton.errorsCount > 0">{{ saveButton.errorsCount }} question(s) will not be saved</span>
  </div>
</template>

<script>
import { Box } from '../../NES';
import Answer from './Answer';

const codes = {
  notValidated: 0,
  validationOK: 1,
  validationFailed: 2,
};

const saveButton = {
  statuses: {
    validate: { text: 'Validate', code: 0, },
    save: { text: 'Save', code: 1, },
  },
};

export default {
  components: {
    Box,
    Answer,
  },

  props: {
    questions: {
      type: Array,
      default: () => [],
    },
    error: String,
  },

  data() {
    return {
      formData: {
        questions: this.questions,
      },
      saveButton: {
        ...saveButton,
        status: saveButton.statuses.validate,
        setStatus (status) {
          this.status = status;
        },
        errorsCount: 0,
      },
      wasValidated: false,
    };
  },

  watch: {
    'formData.questions': {
      handler(newValue) {
        if (!this.wasValidated && this.saveButton.status.code !== saveButton.statuses.validate.code) {
          this.saveButton.setStatus(saveButton.statuses.validate);
        }
        this.wasValidated = false;
      },
      deep: true,
    },
  },

  computed: {
    buttonText () {
      return this.saveButton.status.text;
    },
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
        status: codes.notValidated,
        errorMessage: '',
      };
    },

    createEmptyAnswer() {
      return {
        text: '',
        isCorrect: false,
      };
    },

    handleSaveQuestions() {
      if (this.saveButton.status.code === saveButton.statuses.validate.code) {
        this.validateProcess();
      } else {
        this.saveProcess();
      }
    },

    validateProcess() {
      this.validateQuestions(this.formData.questions)
        .then(({ questionsOK, willBeDeleted }) => {
          willBeDeleted.forEach(toDelete => {
            toDelete.question.status = codes.validationFailed;
            toDelete.question.errorMessage = toDelete.errorMessage;
          })

          questionsOK.forEach(question => {
            question.status = codes.validationOK;
          });

          this.saveButton.setStatus(saveButton.statuses.save);
          this.wasValidated = true;
          this.saveButton.errorsCount = willBeDeleted.length;
        })
      ;
    },

    validateQuestions (questions) {
      return new Promise((resolve, reject) => {
        const willBeDeleted = [];
        const questionsOK = [];
        const isAtLeastOneAnswerValidated = answers => {
          return answers.some(a => a.isCorrect && !a.text.trim().length) || !answers.some(a => a.isCorrect);
        }

        questions.forEach(question => {
          switch (true) {
            case !question.text.trim().length:
              willBeDeleted.push({ question, errorMessage: 'Empty field.' });
              break;
            case !question.answers.length || !question.answers.some(a => a.text.trim().length):
              willBeDeleted.push({ question, errorMessage: 'Missing answers.' });
              break;
            case isAtLeastOneAnswerValidated(question.answers):
              willBeDeleted.push({ question, errorMessage: 'Empty answers or correct answer is empty.' });
              break;
            default:
              questionsOK.push(question);
          }
          resolve({ willBeDeleted, questionsOK });
        })
      });
    },

    saveProcess () {
      const notEmptyAnswerFilter = answer => answer.text.trim().length;
      const notValidatedQuestionsFilter = question => {
        const areAnswersCorrect = answers => answers.some(answer => answer.text.trim().length && answer.isCorrect);
        return question.text.trim().length && question.answers.length && areAnswersCorrect(question.answers);
      }

      const questions = this.formData.questions
        .filter(notValidatedQuestionsFilter)
        .map(question => {
          const answers = question.answers.filter(notEmptyAnswerFilter);
          return {
            ...question,
            answers,
          }
        });

      this.$emit('save', { questions });
    }
  }
}
</script>

<style lang="scss" scoped src="./question.scss" />
