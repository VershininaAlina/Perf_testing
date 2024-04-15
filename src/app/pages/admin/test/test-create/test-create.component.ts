import {Component, input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonAcceptComponent} from "../../../../component/button/button-accept/button-accept.component";
import {WindowService} from "../../../../../service/window/window.service";
import {AnswerCreateComponent} from "../answer-create/answer-create.component";
import {Question} from "../../../../../service/admin/dto/question";
import {NgForOf, NgIf} from "@angular/common";
import {ButtonKeepComponent} from "../../../../component/button/button-keep/button-keep.component";
import {FormService} from "../../../../../service/form.service";
import {TestService} from "../../../../../service/admin/test.service";
import {AlertService} from "../../../../../service/window/alert.service";

@Component({
  selector: 'app-test-create',
  standalone: true,
  imports: [
    ButtonAcceptComponent,
    NgForOf,
    NgIf,
    ButtonKeepComponent
  ],
  providers: [
    FormService,
    WindowService,
    AlertService
  ],
  templateUrl: './test-create.component.html',
  styleUrl: './test-create.component.css'
})
export class TestCreateComponent {


  vacancyId = 0;
  clicked = false;
  questions: Question[] = []

  constructor(private route: ActivatedRoute,
              private router: Router,
              private windowService: WindowService,
              private formService: FormService,
              private testService: TestService,
              private alertService: AlertService,
  ) {

    this.vacancyId = Number(this.route.snapshot.params['vacancyId'])

  }

  addAnswer() {
    this.windowService.openPopup2(AnswerCreateComponent, this)
  }

  addQuestion(question: Question) {
    this.questions.push(question)
  }

  deleteQuestion(question: Question) {
    this.questions = this.questions.filter((input: any) => question !== input)
  }


  submit() {
    if (this.clicked) return;
    this.clicked = true;

    if (this.questions.length == 0) {
      this.alertService.openPopup("Минимальное кол-во вопросов: 1")
      this.clicked = false;
      return;
    }

    let data = this.formService.getFormDataDef()

    if (!data.name || data.name === "") {
      this.alertService.openPopup("Введите название теста")
    } else if (data.name.length > 255) {
      this.alertService.openPopup("Максимальная длинна описания 1024 символа")
    } else if (!data.description || data.description === "") {
      this.alertService.openPopup("Введите описание текста")
    } else if (data.description.length > 1024) {
      this.alertService.openPopup("Максимальная длинна описания 1024 символа")
    } else {


      let obj = {
        name: data.name,
        description: data.description,
        questionDtos: this.questions
      }
      this.testService.createTest(this.vacancyId, obj).subscribe(value => {
        this.router.navigate(['vacancy/' + this.vacancyId])
      })
      console.log(obj)
      this.clicked = false;
    }
    this.clicked = false;

  }
}
