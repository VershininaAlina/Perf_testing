import {Component} from '@angular/core';
import {ButtonAcceptComponent} from "../../button/button-accept/button-accept.component";
import {ButtonKeepComponent} from "../../button/button-keep/button-keep.component";
import {LogotypeComponent} from "../../logotype/logotype/logotype.component";
import {Router} from "@angular/router";
import {UserLocalService} from "../../../../service/user/user.local.service";
import {NgIf} from "@angular/common";
import {AlertService} from "../../../../service/window/alert.service";

@Component({
  selector: 'app-top-panel',
  standalone: true,
  providers: [
    UserLocalService,
    AlertService
  ],
  imports: [
    ButtonAcceptComponent,
    ButtonKeepComponent,
    LogotypeComponent,
    NgIf
  ],
  templateUrl: './top-panel.component.html',
  styleUrl: './top-panel.component.css'
})
export class TopPanelComponent {
  constructor(private router: Router,
              public userLocalService: UserLocalService) {
  }

  goToLk() {
    this.router.navigate(['lk'])
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
