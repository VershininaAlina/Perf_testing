import {Component, ElementRef} from '@angular/core';
import {ButtonAcceptComponent} from "../../../../component/button/button-accept/button-accept.component";
import {ButtonKeepComponent} from "../../../../component/button/button-keep/button-keep.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FormService} from "../../../../../service/form.service";
import {Answer} from "../../../../../service/admin/dto/answer";
import {Question} from "../../../../../service/admin/dto/question";
import {AlertService} from "../../../../../service/window/alert.service";
import {WindowService} from "../../../../../service/window/window.service";

@Component({
  selector: 'app-answer-create',
  standalone: true,
  providers: [
    FormService,
    AlertService
  ],
  imports: [
    ButtonAcceptComponent,
    ButtonKeepComponent,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './answer-create.component.html',
  styleUrl: './answer-create.component.css'
})
export class AnswerCreateComponent {
  // @ts-ignore
  windowService: WindowService
  component: any

  hashId = 1;
  questionType: any
  answerType: any

  answers: any

  clicked = false;

  constructor(private elementRef: ElementRef,
              private formService: FormService,
              private alertService: AlertService) {
    this.answers = []
  }

  getAnswerType() {
    let radios = this.elementRef.nativeElement.querySelectorAll("input[type='radio']");

    for (let radio of radios) {
      if (radio.name == "answerType") {
        if (radio.checked) {
          return radio.value;
        }
      }
    }
  }


  getQuestionType() {
    let radios = this.elementRef.nativeElement.querySelectorAll("input[type='radio']");

    for (let radio of radios) {
      if (radio.name == "questionType") {
        if (radio.checked) {
          return radio.value;
        }
      }
    }
  }

  addAnswer() {
    this.hashId++;
    this.answers.push({id: this.hashId})
  }

  deleteAnswer(id: any) {
    this.answers = this.answers.filter((answer: any) => answer.id !== id);
  }

  submit() {

    if (this.clicked) return;
    this.clicked = true;


    let data = this.formService.getFormDataSet("form");


    // OPTIONS
    let options: Answer[] = [];
    if (data.answer != null && Array.isArray(data.answer)) {
      for (let answer of data.answer) {
        options.push(new Answer(answer))
      }
    } else if (data.answer != null) {
      options.push(new Answer(data.answer))
    }


    // ANSWER
    let answer: Answer[] = []
    if (data.answerTrue != null && Array.isArray(data.answerTrue)) {
      for (let answerTrue of data.answerTrue) {
        answer.push(options[Number(answerTrue)])
      }
    } else if (data.answerTrue != null) {
      answer.push(options[Number(data.answerTrue)])
    }

    let question = new Question(data.question, data.questionType, data.answerType, answer, options);

    if (question.questionType == "TEXT" && question.options.length == 0) {
      this.alertService.openPopup("Создайте ответы на вопрос!")
      this.clicked = false;
      return
    }
    if (question.questionType == "TEXT" && question.answer.length == 0) {
      this.alertService.openPopup("Выберите правильный ответ!")
      this.clicked = false;
      return
    }


    this.component.addQuestion(question)


    this.clicked = false;
    this.onClick()
  }


  ///////////////////////////////////////////////////////////////////
  onInit(windowService: WindowService) {
    this.windowService = windowService;
  }

  onClick(event?: MouseEvent) {
    if (event != null) {
      if (event.target !== this.elementRef.nativeElement.querySelector("div.area")) {
        return;
      }
    }
    this.windowService.closePopup()
  }
}
