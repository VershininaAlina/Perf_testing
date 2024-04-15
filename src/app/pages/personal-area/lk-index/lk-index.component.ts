import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {ButtonKeepComponent} from "../../../component/button/button-keep/button-keep.component";
import {VacancyPreviewComponent} from "../../../component/vacancy/vacancy-preview/vacancy-preview.component";
import {
  VacancyPreviewWithTestsComponent
} from "../../../component/vacancy/vacancy-preview-with-tests/vacancy-preview-with-tests.component";
import {Router} from "@angular/router";
import {UserService} from "../../../../service/user/user.service";
import {NgForOf, NgIf} from "@angular/common";
import {TokenService} from "../../../../service/token.service";
import {env} from "../../../env/env";

@Component({
  selector: 'app-lk-index',
  standalone: true,
  imports: [
    ButtonAcceptComponent,
    ButtonKeepComponent,
    VacancyPreviewComponent,
    VacancyPreviewWithTestsComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './lk-index.component.html',
  styleUrl: './lk-index.component.css'
})
export class LkIndexComponent implements OnDestroy, OnInit, AfterViewInit {
  //@ts-ignore
  @ViewChildren(VacancyPreviewWithTestsComponent) vacancyComponents: QueryList<VacancyPreviewWithTestsComponent>;

  user: any
  testPassed: any

  constructor(private elementRef: ElementRef,
              private router: Router,
              private userService: UserService,
              private tokenService: TokenService) {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f5f5f5';

    let user = localStorage.getItem("user");
    if (user != null) {
      this.user = JSON.parse(user)
    }
  }

  ngOnInit(): void {
    this.userService.getMe().subscribe(user => {
      this.userService.getTestPassed().subscribe(value => {
        this.testPassed = value
        let obj = this;
        obj.user = user;

        /*
                setTimeout(function () {
                  obj.user = user;

                  setTimeout(function () {
                    for (let vacancyComponent of obj.vacancyComponents) {
                      vacancyComponent.init()
                    }

                  }, 100)
                }, 100)

         */

        localStorage.setItem("user", JSON.stringify(user))


        //  let obj = this


      })
    })
  }

  navigateToEdit() {
    this.router.navigate(['lk/edit'])
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';

  }

  protected readonly JSON = JSON;

  exit() {
    this.tokenService.clear()
  }


  ngAfterViewInit(): void {

  }

  getProfilePhoto(): any {
    if (this.user == null) return null;
    if (this.user.photoProfile != null) {

      let image = this.user.photoProfile.link.replace("images/", "").replace("res/", "");

      return 'background-image: url("' + env.debug + '/profile/avatar?fileName=' + image +
        '")'
    }

    return null;
  }

  getTestPassed(vacancy: any): any {
    if (this.testPassed == null) return null;

    let data = []
    for (let test of this.testPassed) {
      if (test.vacancy == vacancy.id) {
        for (let testPassed of test.testPassed) {
          data.push(testPassed)
        }
        return data;
      }
    }

    return null;
  }

}
