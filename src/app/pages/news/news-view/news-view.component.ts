import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../../../service/news/news.service";
import {ActivatedRoute} from "@angular/router";
import {UserAdminService} from "../../../../service/admin/user.admin.service";
import {UserLocalService} from "../../../../service/user/user.local.service";
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {AlertService} from "../../../../service/window/alert.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-news-view',
  standalone: true,
  providers: [
    AlertService,
    UserLocalService
  ],
  imports: [
    ButtonAcceptComponent,
    NgIf
  ],
  templateUrl: './news-view.component.html',
  styleUrl: './news-view.component.css'
})
export class NewsViewComponent implements OnInit {

  news: any
  id = 1;


  constructor(private newsService: NewsService,
              private route: ActivatedRoute,
              private userAdminService: UserAdminService,
              public userLocalService: UserLocalService) {
    this.id = route.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.newsService.getNew(this.id).subscribe(value => {
      this.news = value;
    })
  }

  getDescription(): any {
    return this.news.description.replaceAll("\n", "<br>")
  }

  getBody() {
    return this.news.body.replaceAll("\n", "<br>")
  }


  getDate() {
    const unixTime = Number(this.news.date); // Время Unix
    const formattedDate = this.formatDate(unixTime);
    return (formattedDate);
  }

  formatDate(unixTime: any) {
    const date = new Date(unixTime);
    const options: any = {day: 'numeric', month: 'long', year: 'numeric'};
    return date.toLocaleDateString('ru-RU', options);
  }


  getTime() {
    let text = this.news.body + this.news.header + this.news.desc;
    return Math.floor(text.split(" ").length / 180) + "мин."
  }
}
