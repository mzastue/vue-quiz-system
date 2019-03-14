import defaultConfig from '../../config';

class QuizConfig {
  constructor() {
    this.isTimeLimit = defaultConfig.timeLimit;
    this.timeForAnswer = defaultConfig.timeForAnswer; // seconds
    this.questionsAmount = 0;
    this.questionsCount = 0;
  }

  setQuestionsCount(count) {
    this.questionsCount = count;
    this.questionsAmount = count;
  }

  setQuestionsTimeLimit(isTimeLimit) {
    this.isTimeLimit = isTimeLimit;
  }

  setQuestionTimeLimitValue(timeForAnswer) {
    this.timeForAnswer = timeForAnswer;
  }
}

export default QuizConfig;
