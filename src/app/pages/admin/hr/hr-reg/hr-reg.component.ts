import {Component, ElementRef} from '@angular/core';
import {ButtonAcceptComponent} from "../../../../component/button/button-accept/button-accept.component";
import {FormService} from "../../../../../service/form.service";
import {AlertService} from "../../../../../service/window/alert.service";
import {TokenService} from "../../../../../service/token.service";
import {WindowService} from "../../../../../service/window/window.service";
import {HrService} from "../../../../../service/admin/hr/hr.service";

@Component({
  selector: 'app-hr-reg',
  standalone: true,
  providers: [
    AlertService,
    FormService,
    WindowService
  ],
  imports: [
    ButtonAcceptComponent
  ],
  templateUrl: './hr-reg.component.html',
  styleUrl: './hr-reg.component.css'
})
export class HrRegComponent {

  winService: any
  clicked = false;

  constructor(private formService: FormService,
              private alertService: AlertService,
              private tokenService: TokenService,
              private elementRef: ElementRef,
              private hrService: HrService) {
  }

  submit() {
    if (this.clicked) return;
    this.clicked = true;

    let data = this.formService.getFormDataDef()
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярное выражение для проверки email'a

    if (data.name === "") {
      this.alertService.openPopup("Пожалуйста, введите имя");
    } else if (data.surname === "") {
      this.alertService.openPopup("Пожалуйста, введите фамилию");
    } else if (data.email === "") {
      this.alertService.openPopup("Пожалуйста, введите адрес электронной почты");
    } else if (!emailRegex.test(data.email)) {
      this.alertService.openPopup("Пожалуйста, введите корректный адрес электронной почты");
    } else if (data.password === "") {
      this.alertService.openPopup("Пожалуйста, введите пароль");
    } else {


      this.hrService.reg(data).subscribe(value => {
        window.location.reload();
      }, error => {
        this.alertService.openPopup(error.error.message)
        this.clicked = false;
      })


    }
    this.clicked = false;

  }

  ///////////////////////////////////////////////////////////////////
  onInit(winService: WindowService) {
    this.winService = winService;
  }

  onClick(event?: MouseEvent) {
    if (event != null) {
      if (event.target !== this.elementRef.nativeElement.querySelector("div.area")) {
        return;
      }
    }
    this.winService.closePopup()
  }

}
