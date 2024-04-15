import {Component, Input, OnInit} from '@angular/core';
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {TestPassService} from "../../../../service/test/test.pass.service";
import {VacancyService} from "../../../../service/vacancy/vacancy.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormService} from "../../../../service/form.service";
import {AlertService} from "../../../../service/window/alert.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CameraService} from "../../../../service/camera/camera.service";
import {MessagingService} from "../../../component/camera/camera/service/messaging.service";
import {TestPreviewComponent} from "../test-preview/test-preview.component";

@Component({
  selector: 'app-test-page',
  standalone: true,
  providers: [
    FormService,
    AlertService,
    CameraService,
    MessagingService
  ],
  imports: [
    ButtonAcceptComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})
export class TestPageComponent implements OnInit {
  //@ts-ignore
  testPreviewComponent: TestPreviewComponent

  clicked = false;

  vacancyId: any
  testId: any


  index: number = 0

  testObject: any


  constructor(private testPassService: TestPassService,
              private vacancyService: VacancyService,
              private route: ActivatedRoute,
              private formService: FormService,
              private alertService: AlertService,
              private router: Router) {
    this.vacancyId = this.route.parent?.snapshot.params['vacancyId']
    this.testId = this.route.parent?.snapshot.params['testId']


  }

  public setTestPreviewComponent(testPreviewComponent: TestPreviewComponent) {
    this.testPreviewComponent = testPreviewComponent;

  }


  ngOnInit(): void {
    this.vacancyService.getVacancy(this.vacancyId).subscribe(value => {
      for (let test of value.testDtos) {
        if (test.id == this.testId) {
          this.testObject = test;
          break
        }

      }
    })
  }

  getQuestionObject(): any {
    return this.testObject.questionDtos[this.index];
  }

  getQuestion(): any {
    return this.getQuestionObject().question
  }

  getTypeQuestion(): any {
    return this.getQuestionObject().questionType;
  }

  getTypeAnswer(): any {

    return this.getQuestionObject().answerType;
  }

  getQuestionSize(): number {
    return Number(this.testObject.questionDtos.length);
  }

  getAnswerDtoList(): any {
    return this.getQuestionObject().answerDtoList;
  }


  public next() {
  //  console.log(this.testPreviewComponent.getCameraService().videoRecording)
    if (this.clicked) return;
    this.clicked = true;
    let data = this.formService.getFormDataAnswer("form");

    let obj = {
      questionId: this.getQuestionObject().id,
      answersId: data.answersId
    }
    if (this.getTypeQuestion() != 'VOICE') {
      if (obj.answersId == null) {
        this.alertService.openPopup("Выберите хотя бы один правильный ответ!")
        this.clicked = false;
      } else {
        this.testPassService.answer(obj, this.testId).subscribe(value => {
          this.index++;
          if (this.index >= this.getQuestionSize()) {
            this.index = this.getQuestionSize() - 1;
          }
          this.clicked = false;
        }, error => {
          this.clicked = false;
          this.alertService.openPopup(error.error.message)
        })
      }
    } else {
      this.index++;
      if (this.index >= this.getQuestionSize()) {
        this.index = this.getQuestionSize() - 1;
      }
      this.clicked = false;
    }



  }

  endTest() {
    if (this.clicked) return;
    this.clicked = true;


    let data = this.formService.getFormDataAnswer("form");

    let obj = {
      questionId: this.getQuestionObject().id,
      answersId: data.answersId
    }
    if (this.getTypeQuestion() != 'VOICE') {
      if (obj.answersId == null) {
        this.alertService.openPopup("Выберите хотя бы один правильный ответ!")
        this.clicked = false;
      } else {
        this.testPassService.answer(obj, this.testId).subscribe(value => {
          this.endTestAction()

        }, error => {
          this.clicked = false;
          this.alertService.openPopup(error.error.message)
        })
      }
    } else {
      this.endTestAction()
    }

  }

  endTestAction() {
    this.testPassService.endTest(this.vacancyId, this.testId).subscribe(value => {
      this.testPreviewComponent.getCameraService().stopVideoCapture()
      this.router.navigate(['vacancy/' + this.vacancyId])
    }, error => {
      this.clicked = false;
      this.alertService.openPopup(error.error.message)
    })
  }

  back() {
    this.index -= 1;
    if (this.index <= 0) this.index = 0;
  }
}
