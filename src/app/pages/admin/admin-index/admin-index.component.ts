import {Component} from '@angular/core';
import {ButtonPagesComponent} from "../../../component/button/button-pages/button-pages.component";
import {VacancyPreviewComponent} from "../../../component/vacancy/vacancy-preview/vacancy-preview.component";
import {VacancyAdminService} from "../../../../service/admin/vacancy.admin.service";
import {
  VacancyAdminPreviewComponent
} from "../../../component/vacancy/vacancy-admin-preview/vacancy-admin-preview.component";
import {NgForOf, NgIf} from "@angular/common";
import {ButtonKeepComponent} from "../../../component/button/button-keep/button-keep.component";
import {ActivatedRoute, Router} from "@angular/router";
import {VacancyService} from "../../../../service/vacancy/vacancy.service";

@Component({
  selector: 'app-admin-index',
  standalone: true,
  imports: [
    ButtonPagesComponent,
    VacancyPreviewComponent,
    VacancyAdminPreviewComponent,
    NgForOf,
    ButtonKeepComponent,
    NgIf
  ],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.css'
})
export class AdminIndexComponent {

  vacancies: any;
  vacanciesCount: any;
  pageNumber: any;

  constructor(private vacancyAdminService: VacancyAdminService,
              private router: Router,
              private vacancyService: VacancyService,
              private route:ActivatedRoute) {
    this.pageNumber = this.route.snapshot.queryParams['page'];
    if (this.pageNumber == null) {
      this.pageNumber = 0;
    } else {
      this.pageNumber -= 1;
    }
    this.vacancyAdminService.getAdminVacancy(0).subscribe(value => {
      this.vacancyService.getVacancyListSize().subscribe(count => {

        this.vacanciesCount = count;
        this.vacancies = value


      })
    })
  }

  protected readonly JSON = JSON;

  navigateToVacancyCreate() {
    this.router.navigate(['admin/vacancy_create'])
  }

}
