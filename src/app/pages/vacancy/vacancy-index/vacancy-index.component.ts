import {Component, OnInit} from '@angular/core';
import {VacancyPreviewComponent} from "../../../component/vacancy/vacancy-preview/vacancy-preview.component";
import {ButtonPagesComponent} from "../../../component/button/button-pages/button-pages.component";
import {VacancyService} from "../../../../service/vacancy/vacancy.service";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {UserLocalService} from "../../../../service/user/user.local.service";
import {ButtonKeepComponent} from "../../../component/button/button-keep/button-keep.component";
import {AlertService} from "../../../../service/window/alert.service";

@Component({
  selector: 'app-vacancy-index',
  standalone: true,
  providers: [
    UserLocalService,
    AlertService
  ],
  imports: [
    VacancyPreviewComponent,
    ButtonPagesComponent,
    NgForOf,
    ButtonAcceptComponent,
    NgIf,
    ButtonKeepComponent
  ],
  templateUrl: './vacancy-index.component.html',
  styleUrl: './vacancy-index.component.css'
})
export class VacancyIndexComponent implements OnInit {
  pageNumber = 0;
  vacancies: any
  vacanciesCount: any

  constructor(private vacancyService: VacancyService,
              private route: ActivatedRoute,
              public userLocalService: UserLocalService) {
    this.pageNumber = this.route.snapshot.queryParams['page'];
    if (this.pageNumber == null) {
      this.pageNumber = 0;
    } else {
      this.pageNumber -= 1;
    }
  }

  ngOnInit(): void {
    this.vacancyService.getVacancyList(this.pageNumber).subscribe(value => {
      this.vacancyService.getVacancyListSize().subscribe(count => {
        this.vacancies = value;
        this.vacanciesCount = count;
      })
    })
  }


}
