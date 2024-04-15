import {Component, ElementRef} from '@angular/core';
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {Router, RouterOutlet} from "@angular/router";
import {FormService} from "../../../../service/form.service";
import {AlertService} from "../../../../service/window/alert.service";

import {TokenService} from "../../../../service/token.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../../../service/http/auth/auth.service";
import {WindowService} from "../../../../service/window/window.service";

@Component({
  selector: 'app-auth-sing-up',
  standalone: true,
  imports: [
    ButtonAcceptComponent,
    RouterOutlet
  ],
  providers: [
    FormService,
    AlertService,
    AuthService,
  ],
  templateUrl: './auth-sing-up.component.html',
  styleUrl: './auth-sing-up.component.css'
})
export class AuthSingUpComponent {
  winService: any
  clicked = false;

  constructor(private formService: FormService,
              private alertService: AlertService,
              private authService: AuthService,
              private tokenService: TokenService,
              private elementRef: ElementRef) {
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
    } else if (!data.accept) {
      this.alertService.openPopup("Вы должны принять условия использования");
    } else {
      delete data['accept']

      this.authService.reg(data).subscribe(value => {
        this.tokenService.saveToken(value.token)
        this.onClick();
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
