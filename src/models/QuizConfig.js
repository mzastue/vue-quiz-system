import defaultConfig from '../../config';

class QuizConfig {
  constructor() {
    this.isTimeLimit = defaultConfig.timeLimit;
    this.timeForAnswer = defaultConfig.timeForAnswer; // seconds
    this.questionsAmount = 0;
    this.questionsCount = 0;
  }

  setQuestionsCount(count) {
    if (count >= 0) {
      this.questionsCount = count;
      this.questionsAmount = count;
    }
  }

  setQuestionsTimeLimit(isTimeLimit) {
    if (typeof isTimeLimit === "boolean") {
      this.isTimeLimit = isTimeLimit;
    }
  }

  setQuestionTimeLimitValue(timeForAnswer) {
    if (timeForAnswer) {
      this.timeForAnswer = timeForAnswer;
    }
  }
}

export default QuizConfig;
