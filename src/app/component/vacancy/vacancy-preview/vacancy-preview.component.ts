import {Component, Input} from '@angular/core';
import {ButtonAcceptComponent} from "../../button/button-accept/button-accept.component";
import {ButtonAcceptBigComponent} from "../../button/button-accept-big/button-accept-big.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vacancy-preview',
  standalone: true,
  imports: [
    ButtonAcceptComponent,
    ButtonAcceptBigComponent
  ],
  templateUrl: './vacancy-preview.component.html',
  styleUrl: './vacancy-preview.component.css'
})
export class VacancyPreviewComponent {
  @Input() id: any
  @Input() name: any
  @Input() description: any

  constructor(private router: Router) {
  }

  navigateToVacancy() {
    this.router.navigate(['vacancy/' + this.id])
  }

}
