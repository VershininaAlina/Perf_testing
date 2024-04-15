import { Component } from '@angular/core';
import {ButtonAcceptBigComponent} from "../../component/button/button-accept-big/button-accept-big.component";
import {ButtonAcceptComponent} from "../../component/button/button-accept/button-accept.component";

@Component({
  selector: 'app-about-campany',
  standalone: true,
    imports: [
        ButtonAcceptBigComponent,
        ButtonAcceptComponent
    ],
  templateUrl: './about-campany.component.html',
  styleUrl: './about-campany.component.css'
})
export class AboutCampanyComponent {

}
