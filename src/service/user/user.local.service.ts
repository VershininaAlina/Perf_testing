import {Injectable, Type} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../http/auth/auth.service";
import {Observable} from "rxjs";
import {Resolve, Router} from "@angular/router";
import {ProfileService} from "../profile/profile.service";
import {Token} from "@angular/compiler";
import {TokenService} from "../token.service";
import {UserService} from "./user.service";
import {VacancyAdminService} from "../admin/vacancy.admin.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {AlertService} from "../window/alert.service";
import {NewsAdminService} from "../admin/news.admin.service";

@Injectable({providedIn: "root", useExisting: true})
export class UserLocalService {

  private user: any;

  constructor(private userService: UserService,
              private tokenService: TokenService,
              private vacancyAdminService: VacancyAdminService,
              private alertService: AlertService,
              private newsAdminService: NewsAdminService,
              private router: Router) {
    this.setUserData(this);
  }


  //@ts-ignore
  private setUserData(component: any) {
    if (!this.tokenService.isAuth()) return;
    let user = localStorage.getItem("user");

    if (user == null) {
      this.userService.getMe().subscribe(value => {
        localStorage.setItem("user", JSON.stringify(value));
        component.user = value;
      })
    } else {
      component.user = JSON.parse(user);
    }
  }

  getUser(): any {
    return this.user;
  }

  getUserRole(): any {
    if (this.user == null) {
      return null;
    }
    return this.user.role;
  }

  isHr() {
    return this.getUserRole() == "HR"
  }

  navigateToAdminNewsCreate() {
    this.router.navigate(['admin/news_create'])
  }

  navigateToVacancyCreate() {
    this.router.navigate(['admin/vacancy_create'])
  }

  deleteVacancy(id: any) {
    this.vacancyAdminService.delete(id).subscribe(value => {
      this.router.navigate(['vacancies'])
    }, error => {
      this.alertService.openPopup("Вакансия не найдена")
    })
  }

  navigateToTestCreate(id: any) {
    this.router.navigate(['admin/test_create/' + id])

  }

  navigateToAdminVacancy() {
    this.router.navigate(['admin'])
  }

  deleteNews(id: any) {
    this.newsAdminService.deleteNews(id).subscribe(value => {
      this.router.navigate(['news'])
    }, error => {
      this.alertService.openPopup(error.error.message)
    })
  }

  navigateToHr() {
    this.router.navigate(['admin/hr'])
  }
}
