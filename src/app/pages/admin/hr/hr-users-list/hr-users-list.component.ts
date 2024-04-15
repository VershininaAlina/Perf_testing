import {Component, OnInit} from '@angular/core';
import {WindowService} from "../../../../../service/window/window.service";
import {ButtonKeepComponent} from "../../../../component/button/button-keep/button-keep.component";
import {ButtonPagesComponent} from "../../../../component/button/button-pages/button-pages.component";
import {NgForOf} from "@angular/common";
import {
  VacancyAdminPreviewComponent
} from "../../../../component/vacancy/vacancy-admin-preview/vacancy-admin-preview.component";
import {HrService} from "../../../../../service/admin/hr/hr.service";
import {HrRegComponent} from "../hr-reg/hr-reg.component";
import {ButtonAcceptComponent} from "../../../../component/button/button-accept/button-accept.component";
import {AlertService} from "../../../../../service/window/alert.service";

@Component({
  selector: 'app-hr-users-list',
  standalone: true,
  providers: [
    WindowService,
    AlertService
  ],
  imports: [
    ButtonKeepComponent,
    ButtonPagesComponent,
    NgForOf,
    VacancyAdminPreviewComponent,
    ButtonAcceptComponent
  ],
  templateUrl: './hr-users-list.component.html',
  styleUrl: './hr-users-list.component.css'
})
export class HrUsersListComponent implements OnInit {


  users: any

  constructor(private windowService: WindowService,
              private hrService: HrService,
              private alertService: AlertService) {

  }

  createHr() {
    this.windowService.openPopup(HrRegComponent)
  }

  ngOnInit(): void {
    this.hrService.getUsersHr().subscribe(value => {
      this.users = value
    })
  }

  deleteUser(id: any) {
    this.hrService.deleteUser(id).subscribe(value => {
      window.location.reload()
    }, error => {
      this.alertService.openPopup(error.error.message)
    })

  }

  setRole(id: any) {
    this.hrService.setRoleUser(id).subscribe(value => {
      window.location.reload()
    }, error => {
      this.alertService.openPopup(error.error.message)
    })
  }

  setHr() {
    let id = prompt("ID: назначаемого user'a")
    if (id == null || id === "" || isNaN(Number(id))) return;
    this.hrService.setRoleHR(id).subscribe(value => {
      window.location.reload()
    }, error => {
      this.alertService.openPopup(error.error.message)
    })
  }
}
