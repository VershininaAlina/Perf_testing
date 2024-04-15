import {Component} from '@angular/core';
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {FormService} from "../../../../service/form.service";
import {AlertService} from "../../../../service/window/alert.service";
import {NewsAdminService} from "../../../../service/admin/news.admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news-create',
  standalone: true,
  providers: [
    FormService,
    AlertService
  ],
  imports: [
    ButtonAcceptComponent
  ],
  templateUrl: './news-create.component.html',
  styleUrl: './news-create.component.css'
})
export class NewsCreateComponent {

  clicked = false;

  constructor(private formService: FormService,
              private alertService: AlertService,
              private newsAdminService: NewsAdminService,
              private router: Router) {

  }


  submit() {
    if (this.clicked) return;
    this.clicked = true;
    let data = this.formService.getFormDataDef();

    if (data.header === "") {
      this.alertService.openPopup("Введите название новости")
    } else if (data.header.length > 150) {
      this.alertService.openPopup("Максимальная длинна названия новости 150 символов")
    } else if (data.description === "") {
      this.alertService.openPopup("Введите описание новости")
    } else if (data.description.length > 512) {
      this.alertService.openPopup("Максимальная длинна описания новости 512 символов")
    } else if (data.body === "") {
      this.alertService.openPopup("Напишите статью")
    } else if (data.body.length > 4096) {
      this.alertService.openPopup("Максимальная длинна статьи новости 4096 символов")
    } else {
      this.newsAdminService.createNews(data).subscribe(value => {

        this.router.navigate(['news/view/' + value.id])
        this.clicked = false
      }, error => {
        this.clicked = false
      })
    }
    this.clicked = false;
  }

}
