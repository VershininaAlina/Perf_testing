import {Component, ElementRef} from '@angular/core';
import {ButtonAcceptComponent} from "../../button/button-accept/button-accept.component";
import {AlertService} from "../../../../service/window/alert.service";
import {WindowService} from "../../../../service/window/window.service";
import {ButtonKeepComponent} from "../../button/button-keep/button-keep.component";
import {NgForOf} from "@angular/common";
import {ExpirienceService} from "../../../../service/expirience/expirience.service";
import {FormService} from "../../../../service/form.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-expirience-create',
  standalone: true,
  imports: [
    ButtonAcceptComponent,
    ButtonKeepComponent,
    NgForOf
  ],
  providers: [
    FormService,
    AlertService
  ],
  templateUrl: './expirience-create.component.html',
  styleUrl: './expirience-create.component.css'
})
export class ExpirienceCreateComponent {
  windowService: any
  clicked = false;

  constructor(private elementRef: ElementRef,
              private expirienceService: ExpirienceService,
              private formService: FormService,
              private alertService: AlertService) {

  }


  submit() {
    if (this.clicked) return;
    this.clicked = true;

    let data = this.formService.getFormDataDef();
    //this.expirienceService.createExperience()

    if (!data.position || data.position.length > 150) {
      if (!data.position || data.position === "") {
        this.alertService.openPopup("Поле 'Должность' обязательно для заполнения.");

      } else {
        this.alertService.openPopup("Поле 'Должность' не может содержать более 150 символов.");
      }

    } else if (data.yearOfExperience === "" || isNaN(Number(data.yearOfExperience)) || !data.yearOfExperience) {

      if (isNaN(Number(data.yearOfExperience)) || Number(data.yearOfExperience) == 0) {
        this.alertService.openPopup("Поле 'Стаж работы' должно быть числом.");

      } else {
        this.alertService.openPopup("Поле 'Стаж работы' обязательно для заполнения.");

      }

    } else if (data.description === "" || data.description.length > 4096 || !data.description) {

      if (data.description.length > 4096) {
        this.alertService.openPopup("Поле 'Описание' не может содержать более 4096 символов.");

      } else {
        this.alertService.openPopup("Поле 'Описание' обязательно для заполнения.");
      }

    } else {
      console.log("Create expirience")
      this.expirienceService.createExperience(data).subscribe(value => {
        console.log(value)
        window.location.reload()
      }, error => {
        this.clicked = false;
        this.alertService.openPopup(error.error.message)
      })
    }
    this.clicked = false;
  }

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
