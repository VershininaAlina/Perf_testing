import {Component, Input} from '@angular/core';
import {ButtonAcceptComponent} from "../../button/button-accept/button-accept.component";
import {AlertService} from "../../../../service/window/alert.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    ButtonAcceptComponent,

  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() text: any

  // @ts-ignore
  alertService: any

  onInit(alertService: any) {
    this.alertService = alertService;
  }

  onClick() {
    this.alertService.closePopup()
  }
}
