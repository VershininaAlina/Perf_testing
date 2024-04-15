import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {CameraComponent} from "../../../component/camera/camera/camera.component";
import {AlertService} from "../../../../service/window/alert.service";
import {TestPassService} from "../../../../service/test/test.pass.service";
import {ActivatedRoute, Router} from "@angular/router";

import {CameraService} from "../../../../service/camera/camera.service";
import {TestPageComponent} from "../test-page/test-page.component";
import {WindowService} from "../../../../service/window/window.service";
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";

import {error} from "@angular/compiler-cli/src/transformers/util";
import {VacancyService} from "../../../../service/vacancy/vacancy.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-test-preview',
  standalone: true,
  providers: [
    AlertService,
    CameraService,
    WindowService
  ],

  imports: [
    CameraComponent,
    TestPageComponent,
    ButtonAcceptComponent,
    NgIf,

  ],
  templateUrl: './test-preview.component.html',
  styleUrl: './test-preview.component.css'
})
export class TestPreviewComponent implements AfterViewInit, OnDestroy {
  // @ts-ignore
  @ViewChild(CameraComponent) private cameraComponent: CameraComponent;


  vacancyId: any
  testId: any
  testObject: any


  constructor(private alertService: AlertService,
              private testPassService: TestPassService,
              private route: ActivatedRoute,
              private router: Router,
              private windowService: WindowService,
              private elementRef: ElementRef,
              private vacancyService: VacancyService) {
    this.vacancyId = route.snapshot.params['vacancyId']
    this.testId = route.snapshot.params['testId']
  }

  ngAfterViewInit(): void {
    let obj = this;
    this.vacancyService.getVacancy(this.vacancyId).subscribe(value => {
      for (let test of value.testDtos) {
        if (test.id == this.testId) {
          this.testObject = test;
          break
        }

      }
    })
    setTimeout(function () {
      obj.alertService.openPopup("Попытка одна и будет съемка. Если пользователь  не отправил или закрыл вкладку , повторно в лк он пройти не может этот тест.")
    }, 1500)

  }

  getCameraService(): CameraService {
    return this.cameraComponent.getCameraService()
  }

  startTestComponentInit() {
    this.getCameraService().connect();
    let element = this.elementRef.nativeElement.querySelector("div#camera-controller")
    element.style.display = "none"
    let pageTest = this.windowService.addWindow(TestPageComponent);
    pageTest.setTestPreviewComponent(this)

  }

  startTest() {
    if (this.getCameraService().access) {
      this.testPassService.startTest(this.vacancyId, this.testId).subscribe(value => {
          this.startTestComponentInit()
        },
        error => {
          let errorMessage = error.error.message
          if (errorMessage == "User test already started" || errorMessage == "You already started test") {
            this.alertService.openPopup("Вы уже начали тест. Попытка одна в одной вкладке!")
          } else if (errorMessage == "User test already passed") {
            this.alertService.openPopup("Вы уже сдали этот тест!")

          } else {
            this.alertService.openPopup(errorMessage)
          }

        })
    } else {
      this.alertService.openPopup("Резрешите доступ к камере и микрофону")
    }
  }

  ngOnDestroy(): void {
    console.log("STOP")
    this.getCameraService().stopVideoCapture()
  }


}
