import { Component } from '@angular/core';
import {LogotypeComponent} from "../../../component/logotype/logotype/logotype.component";
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {ButtonKeepComponent} from "../../../component/button/button-keep/button-keep.component";
import {RouterOutlet} from "@angular/router";
import {TopPanelNoAuthComponent} from "../../../component/top-panel/top-panel-no-auth/top-panel-no-auth.component";
import {PanelComponent} from "../../../component/top-panel/panel/panel.component";

@Component({
  selector: 'app-auth-index',
  standalone: true,
  imports: [
    LogotypeComponent,
    ButtonAcceptComponent,
    ButtonKeepComponent,
    RouterOutlet,
    TopPanelNoAuthComponent,
    PanelComponent
  ],
  templateUrl: './auth-index.component.html',
  styleUrl: './auth-index.component.css'
})
export class AuthIndexComponent {

}
