import {Component} from '@angular/core';
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {VacancyAdminService} from "../../../../service/admin/vacancy.admin.service";
import {FormService} from "../../../../service/form.service";
import {AlertService} from "../../../../service/window/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vacancy-create',
  standalone: true,
  providers: [
    FormService,
    AlertService,

  ],
  imports: [
    ButtonAcceptComponent
  ],
  templateUrl: './vacancy-create.component.html',
  styleUrl: './vacancy-create.component.css'
})
export class VacancyCreateComponent {

  clicked = false;

  constructor(private vacancyAdminService: VacancyAdminService,
              private alertService: AlertService,
              private formService: FormService,
              private router: Router) {
  }

  sumbit() {
    if (this.clicked) {
      return;
    }
    this.clicked = true;

    let data = this.formService.getFormDataDef();

    if (data.name.length > 255 || data.name === "") {
      this.alertService.openPopup("Название не должно превышать 255 символов и не должно быть пустым");
    } else if (data.description.length > 2048 || data.description === "") {
      this.alertService.openPopup("Описание не должно превышать 2048 символов и не должно быть пустым");
    } else if (data.responsibilities.length > 2048 || data.responsibilities === "") {
      this.alertService.openPopup("Обязанности не должны превышать 2048 символов и не должны быть пустыми");
    } else if (data.requirements.length > 2048 || data.requirements === "") {
      this.alertService.openPopup("Требования не должны превышать 2048 символов и не должны быть пустыми");
    } else if (data.willPlus.length > 2048 || data.willPlus === "") {
      this.alertService.openPopup("Дополнительные плюсы не должны превышать 2048 символов и не должны быть пустыми");
    } else if (data.conditions.length > 2048 || data.conditions === "") {
      this.alertService.openPopup("Условия не должны превышать 2048 символов и не должны быть пустыми");

    } else {
      this.vacancyAdminService.create(data).subscribe(value => {
        this.router.navigate(['vacancy/' + value.id])
        this.clicked = false;
      }, error => {
        this.clicked = false;
        this.alertService.openPopup(error.error.message)

      })
    }

    this.clicked = false;

  }
}
