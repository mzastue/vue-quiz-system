import {
  Question,
  createAnswers,
} from '../Item';

class Item {
  constructor (
    question = undefined,
    answers = [],
    correct = undefined,
    reference = undefined
  ) {
    this.question = question;
    this.answers = answers;
    this.reference = reference;
    this.correct = correct;
    this.wasAnswered = false;
    this.isAnswerCorrect = false;
  }

  checkAnswer (answerNo) {
    if (!this.wasTouched) {
      this.isAnswerCorrect = this.correct === answerNo;
      this.wasAnswered = true;
    }
  }
}

export default Item;
