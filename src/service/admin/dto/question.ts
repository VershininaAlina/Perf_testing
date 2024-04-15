import {Answer} from "./answer";

export class Question {
  question: any

  // @ts-ignore
  questionType: string

  // @ts-ignore
  answerType: string

  // @ts-ignore
  answer: Answer[]

  // @ts-ignore
  options: Answer[]


  constructor(question: any, questionType: string, answerType: string, answer: Answer[], options: Answer[]) {
    this.question = question;
    this.questionType = questionType;
    this.answerType = answerType;
    this.answer = answer;
    this.options = options;
  }
}
