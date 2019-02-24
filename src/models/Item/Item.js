class Item {
  constructor (
    question = undefined,
    answers = [],
    correct = undefined,
    explanations = [],
  ) {
    this.question = question;
    this.answers = answers;
    this.explanations = explanations;
    this.correct = correct;
    this.wasAnswered = false;
    this.isAnswerCorrect = false;
  }

  checkAnswer (answer) {
    if (!this.wasAnswered) {
      this.isAnswerCorrect = answer.isCorrect || false;
      this.wasAnswered = true;
    }
  }
}

export default Item;
