import { Component } from '@angular/core';
import {ButtonAcceptComponent} from "../../component/button/button-accept/button-accept.component";
import {ButtonAcceptGreenComponent} from "../../component/button/button-accept-green/button-accept-green.component";
import {ButtonKeepComponent} from "../../component/button/button-keep/button-keep.component";
import {NgForOf} from "@angular/common";
import {ButtonAcceptBigComponent} from "../../component/button/button-accept-big/button-accept-big.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    ButtonAcceptComponent,
    ButtonAcceptGreenComponent,
    ButtonKeepComponent,
    NgForOf,
    ButtonAcceptBigComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
