import {Component, OnInit} from '@angular/core';
import {ButtonPagesComponent} from "../../../component/button/button-pages/button-pages.component";
import {VacancyPreviewComponent} from "../../../component/vacancy/vacancy-preview/vacancy-preview.component";
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {ButtonKeepComponent} from "../../../component/button/button-keep/button-keep.component";
import {ActivatedRoute} from "@angular/router";
import {VacancyService} from "../../../../service/vacancy/vacancy.service";
import {NgForOf, NgIf} from "@angular/common";
import {AlertService} from "../../../../service/window/alert.service";
import {RespondService} from "../../../../service/vacancy/respond.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {AuthService} from "../../../../service/http/auth/auth.service";
import {TokenService} from "../../../../service/token.service";
import {UserLocalService} from "../../../../service/user/user.local.service";

@Component({
  selector: 'app-vacancy-view',
  standalone: true,
  providers: [
    AlertService,
    UserLocalService
  ],
  imports: [
    ButtonPagesComponent,
    VacancyPreviewComponent,
    ButtonAcceptComponent,
    ButtonKeepComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './vacancy-view.component.html',
  styleUrl: './vacancy-view.component.css'
})
export class VacancyViewComponent implements OnInit {
  notFound = false;
  id = 0;
  vacancy: any

  click = false;

  constructor(private route: ActivatedRoute,
              private vacancyService: VacancyService,
              private alertService: AlertService,
              private respondService: RespondService,
              private tokenService: TokenService,
              public userLocalService: UserLocalService) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.vacancyService.getVacancy(this.id).subscribe(value => {
      this.vacancy = value;

    }, error => {
      this.notFound = true;
    })
  }


  getData(data: any): any {
    while (data.includes("\n\n")) {
      data = data.replaceAll("\n\n", "\n")
    }
    let spl = data.split("\n");
    let result = "";
    for (let i = 0; i < spl.length; i++) {
      let text = spl[i];

      if (!text.endsWith(";")) {
        text += ";";
      }

      result += "<li>" + text + "</li>";
    }
    return result;
  }

  respond() {
    if (!this.tokenService.isAuth()) {
      this.alertService.openPopup("Авторизуйтесь")
      return;
    }
    if (this.click) return;
    this.click = true;
    this.respondService.respond(this.vacancy.id).subscribe(value => {

      this.alertService.openPopup("Ваша заявка отправлена , пройдите тестирование в личном кабинете и заполните профиль")
    }, error => {

      if (error.error.message == "User already responded on this vacancy") {
        this.alertService.openPopup("Вы уже откликались на данную вакансию")
      } else {
        this.alertService.openPopup(error.error.message)
      }
      this.click = false;
    })
  }

}
