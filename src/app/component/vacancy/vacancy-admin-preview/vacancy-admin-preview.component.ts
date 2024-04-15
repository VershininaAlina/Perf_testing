import {Component, Input} from '@angular/core';
import {ButtonAcceptBigComponent} from "../../button/button-accept-big/button-accept-big.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vacancy-admin-preview',
  standalone: true,
  imports: [
    ButtonAcceptBigComponent
  ],
  templateUrl: './vacancy-admin-preview.component.html',
  styleUrl: './vacancy-admin-preview.component.css'
})
export class VacancyAdminPreviewComponent {
  @Input() id: any
  @Input() name: any
  @Input() description: any
  @Input() numberOfResponded: any
  @Input() numberOfTestPassed: any


  constructor(private router: Router) {
  }

  navigateToVacancy() {
    this.router.navigate(['admin/vacancy/' + this.id])
  }

}
