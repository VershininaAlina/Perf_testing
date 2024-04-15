import {Component, ElementRef} from '@angular/core';
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";

import {TokenService} from "../../../../service/token.service";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "../../../../service/window/alert.service";
import {FormService} from "../../../../service/form.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/http/auth/auth.service";
import {WindowService} from "../../../../service/window/window.service";

@Component({
  selector: 'app-auth-sing-in',
  standalone: true,
  providers: [
    FormService,
    AlertService
  ],
  imports: [
    ButtonAcceptComponent
  ],
  templateUrl: './auth-sing-in.component.html',
  styleUrl: './auth-sing-in.component.css'
})
export class AuthSingInComponent {

  winService: any
  clicked = false;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private alertService: AlertService,
              private formService: FormService,
              private elementRef: ElementRef) {

  }

  submit() {
    if (this.clicked) return;
    this.clicked = true;

    let data = this.formService.getFormDataDef();

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярное выражение для проверки email'a

    if (data.email === "") {
      try {
        this.alertService.openPopup("Пожалуйста, введите адрес электронной почты");
      } catch (e) {
        console.log(e)
      }
    } else if (!emailRegex.test(data.email)) {
      this.alertService.openPopup("Пожалуйста, введите корректный адрес электронной почты");
    } else if (data.password === "") {
      this.alertService.openPopup("Пожалуйста, введите пароль");
    } else {

      this.authService.auth(data).subscribe(value => {
        this.tokenService.saveToken(value.token)
        this.onClick()
        window.location.reload();
      }, error => {
        this.alertService.openPopup(error.error.message)
        this.clicked = false;
      })
      // Все данные верны, продолжайте обработку формы
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
