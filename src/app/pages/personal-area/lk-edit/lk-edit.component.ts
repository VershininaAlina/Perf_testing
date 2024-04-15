import {Component, OnInit} from '@angular/core';
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {ButtonAcceptGreenComponent} from "../../../component/button/button-accept-green/button-accept-green.component";
import {ButtonKeepComponent} from "../../../component/button/button-keep/button-keep.component";
import {UserService} from "../../../../service/user/user.service";
import {NgForOf} from "@angular/common";
import {ExpirienceService} from "../../../../service/expirience/expirience.service";
import {WindowService} from "../../../../service/window/window.service";
import {ExpirienceCreateComponent} from "../../../component/expirience/expirience-create/expirience-create.component";
import {FormService} from "../../../../service/form.service";
import {AlertService} from "../../../../service/window/alert.service";
import {ProfileService} from "../../../../service/profile/profile.service";
import {PhotoUploadComponent} from "../../photo-upload/photo-upload/photo-upload.component";
import {env} from "../../../env/env";

@Component({
  selector: 'app-lk-edit',
  standalone: true,
  providers: [
    WindowService,
    FormService,
    AlertService
  ],
  imports: [
    ButtonAcceptComponent,
    ButtonAcceptGreenComponent,
    ButtonKeepComponent,
    NgForOf
  ],
  templateUrl: './lk-edit.component.html',
  styleUrl: './lk-edit.component.css'
})
export class LkEditComponent implements OnInit {

  clickedEditExperience = false;
  clicked = false;
  user: any

  constructor(private userService: UserService,
              private expirienceService: ExpirienceService,
              private windowService: WindowService,
              private formService: FormService,
              private alertService: AlertService,
              private profileService: ProfileService) {
    let user = localStorage.getItem("user");
    if (user != null) {
      this.user = JSON.parse(user)
    }
  }

  ngOnInit(): void {
    this.userService.getMe().subscribe(value => {
      this.user = value;
      localStorage.setItem("user", JSON.stringify(this.user))
    })
  }

  deleteExperience(id: any) {

    this.expirienceService.deleteExperience(id).subscribe(value => {
      window.location.reload()
    }, error => {
      console.log(error.error)
    })
  }

  addExperience() {
    this.windowService.openPopup(ExpirienceCreateComponent);
  }

  edit(id: any) {
    if (this.clickedEditExperience) return;
    this.clickedEditExperience = true;
    let data = this.formService.getFormData("form_" + id);

    if (!data.position || data.position.length > 150) {
      if (!data.position || data.position === "") {
        this.alertService.openPopup("Поле 'Должность' обязательно для заполнения.");

      } else {
        this.alertService.openPopup("Поле 'Должность' не может содержать более 150 символов.");
      }

    } else if (data.yearOfExperience === "" || isNaN(Number(data.yearOfExperience)) || !data.yearOfExperience) {

      if (isNaN(Number(data.yearOfExperience)) || Number(data.yearOfExperience) == 0) {
        this.alertService.openPopup("Поле 'Стаж работы' должно быть числом.");

      } else {
        this.alertService.openPopup("Поле 'Стаж работы' обязательно для заполнения.");

      }

    } else if (data.description === "" || data.description.length > 4096 || !data.description) {

      if (data.description.length > 4096) {
        this.alertService.openPopup("Поле 'Описание' не может содержать более 4096 символов.");

      } else {
        this.alertService.openPopup("Поле 'Описание' обязательно для заполнения.");
      }

    } else {
      console.log("edited experience")
      this.expirienceService.editExperience(id, data).subscribe(value => {

        this.alertService.openPopup("Профиль успешно обновлён")
        this.clickedEditExperience = false;
      }, error => {
        this.clickedEditExperience = false;
        this.alertService.openPopup(error.error.message)
      })
    }

    this.clicked = false;

  }

  getDate(): string {

    const date = new Date(this.user.birthDay);

    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    const day = date.getDate().toString().padStart(2, '0');

    const year = date.getFullYear();

    let result = `${year}-${month}-${day}`;
    console.log(result)
    return result;

  }

  submit() {
    if (this.clicked) return;
    this.clicked = true;

    let formData = this.formService.getFormData("profile")

    if (!formData.name || formData.name.length > 150) {

      if (!formData.name || formData.name === "") {

        this.alertService.openPopup("Поле 'Имя' обязательно для заполнения.");

      } else {

        this.alertService.openPopup("Поле 'Имя' не может содержать более 150 символов.");

      }

    } else if (!formData.lastname || formData.lastname.length > 150) {

      if (!formData.lastname || formData.lastname === "") {

        this.alertService.openPopup("Поле 'Фамилия' обязательно для заполнения.");

      } else {

        this.alertService.openPopup("Поле 'Фамилия' не может содержать более 150 символов.");

      }

    } else if (!formData.secondname || formData.secondname.length > 150) {

      if (!formData.secondname || formData.secondname === "") {

        this.alertService.openPopup("Поле 'Отчество' обязательно для заполнения.");

      } else {

        this.alertService.openPopup("Поле 'Отчество' не может содержать более 150 символов.");

      }

    } else if (!formData.birthDay || formData.birthDay === "") {

      this.alertService.openPopup("Поле 'Дата рождения' обязательно для заполнения.");

    } else {
      this.profileService.editProfile(formData).subscribe(value => {
        this.alertService.openPopup("Профиль успешно обновлён")
        this.clicked = false;
      }, error => {
        this.alertService.openPopup(error.error.message)
        this.clicked = false
      })
    }
  }

  changePhotoProfile() {
    this.windowService.openPopup(PhotoUploadComponent)
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
}
