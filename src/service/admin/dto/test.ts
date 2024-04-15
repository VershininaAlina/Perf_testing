import {Question} from "./question";


export class Test {
  name: any
  description: any

  // @ts-ignore
  questionDtos: Question[]


  constructor(name: any, description: any, questionDtos: Question[]) {
    this.name = name;
    this.description = description;
    this.questionDtos = questionDtos;
  }
}
