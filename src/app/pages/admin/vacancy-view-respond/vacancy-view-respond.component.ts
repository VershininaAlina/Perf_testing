import {Component, OnInit} from '@angular/core';
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {ButtonKeepComponent} from "../../../component/button/button-keep/button-keep.component";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {VacancyService} from "../../../../service/vacancy/vacancy.service";
import {AlertService} from "../../../../service/window/alert.service";
import {RespondService} from "../../../../service/vacancy/respond.service";
import {TokenService} from "../../../../service/token.service";
import {UserLocalService} from "../../../../service/user/user.local.service";
import {VacancyAdminService} from "../../../../service/admin/vacancy.admin.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {env} from "../../../env/env";

@Component({
  selector: 'app-vacancy-view-respond',
  standalone: true,
  providers: [
    AlertService,
    UserLocalService
  ],
  imports: [
    ButtonAcceptComponent,
    ButtonKeepComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './vacancy-view-respond.component.html',
  styleUrl: './vacancy-view-respond.component.css'
})
export class VacancyViewRespondComponent implements OnInit {
  notFound = false;
  id = 0;
  vacancy: any

  click = false;

  constructor(private route: ActivatedRoute,
              private vacancyService: VacancyService,
              private alertService: AlertService,
              private respondService: RespondService,
              private tokenService: TokenService,
              public userLocalService: UserLocalService,
              private vacancyAdminService: VacancyAdminService,
              private router: Router) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    /*  this.vacancyService.getVacancy(this.id).subscribe(value => {
        this.vacancy = value;
        console.log(value)
      }, error => {
        this.notFound = true;
      })

     */

    this.vacancyAdminService.getAdminVacancyById(this.id).subscribe(value => {
      this.vacancy = value;
      console.log(value)
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
      console.log(value)
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

  showAccount(element: any) {
    let display = element.parentNode.children[1].style.display;
    if (display == null || display === "") {
      element.parentNode.children[1].style.display = 'none';
    } else {
      element.parentNode.children[1].style.display = '';
    }
  }

  navigateToProfile(id: any) {
    const url = 'admin/profile/' + id;
    const route = this.router.createUrlTree([url]);
    window.open(route.toString(), '_blank');
  }

  protected readonly env = env;
}
