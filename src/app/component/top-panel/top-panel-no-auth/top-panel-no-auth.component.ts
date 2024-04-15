import {Component} from '@angular/core';
import {ButtonAcceptComponent} from "../../button/button-accept/button-accept.component";
import {ButtonKeepComponent} from "../../button/button-keep/button-keep.component";
import {LogotypeComponent} from "../../logotype/logotype/logotype.component";
import {Route, Router} from "@angular/router";
import {WindowService} from "../../../../service/window/window.service";
import {AuthSingUpComponent} from "../../../pages/authentication/auth-sing-up/auth-sing-up.component";
import {AuthSingInComponent} from "../../../pages/authentication/auth-sing-in/auth-sing-in.component";

@Component({
  selector: 'app-top-panel-no-auth',
  standalone: true,
  imports: [
    ButtonAcceptComponent,
    ButtonKeepComponent,
    LogotypeComponent
  ],
  providers: [
    WindowService
  ],
  templateUrl: './top-panel-no-auth.component.html',
  styleUrl: './top-panel-no-auth.component.css'
})
export class TopPanelNoAuthComponent {
  constructor(private router: Router,
              private windowService: WindowService) {
  }

  gotToReg() {
    //this.router.navigate(['auth/signup'])
    this.windowService.openPopup(AuthSingUpComponent)
  }

  gotToSingIn() {
    this.windowService.openPopup(AuthSingInComponent)
  }

  navigateToNews() {
    this.router.navigate(['news'])
  }

  navigateVacancy() {
    this.router.navigate(['vacancies'])
  }
  navigateIndex() {
    this.router.navigate([''])
  }
  navigateToSection() {
    this.router.navigate(['selection-stages'])
  }
}
