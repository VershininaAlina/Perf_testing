import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchInputComponent} from "../../../component/input/search-input/search-input.component";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../../../../service/news/news.service";
import {ButtonPagesComponent} from "../../../component/button/button-pages/button-pages.component";
import {UserLocalService} from "../../../../service/user/user.local.service";
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {ButtonKeepComponent} from "../../../component/button/button-keep/button-keep.component";
import {AlertService} from "../../../../service/window/alert.service";

@Component({
  selector: 'app-news-index',
  standalone: true,
  providers: [
    AlertService,
    UserLocalService
  ],
  imports: [
    SearchInputComponent,
    NgForOf,
    ButtonPagesComponent,
    ButtonAcceptComponent,
    NgIf,
    ButtonKeepComponent
  ],
  templateUrl: './news-index.component.html',
  styleUrl: './news-index.component.css'
})
export class NewsIndexComponent implements OnInit {

  // @ts-ignore
  @ViewChild(SearchInputComponent) searchInputComponent: SearchInputComponent;

  news: any
  count: any
  pageNumber: any;


  constructor(private router: Router,
              private newsService: NewsService,
              private route: ActivatedRoute,
              public userLocalService: UserLocalService) {
    this.pageNumber = this.route.snapshot.queryParams['page'];
    if (this.pageNumber == null) {
      this.pageNumber = 0;
    } else {
      this.pageNumber -= 1;
    }
  }

  navigateToNew(id: any) {
    console.log('news/view/' + id)
    this.router.navigate(['news/view/' + id])
  }

  ngOnInit(): void {


    this.newsService.getNews(this.pageNumber).subscribe(value => {
      this.newsService.getCount().subscribe(count => {
        this.count = count;
        this.news = value;



        let obj = this;

        this.searchInputComponent.click = function () {
          obj.pageNumber = 0;
          let q = this.getData();
          obj.newsService.findNews(q, obj.pageNumber).subscribe(value => {
            obj.newsService.countFindNews(q).subscribe(count => {
              obj.count = count;
              obj.news = value;
            })
          });
        }
      })
    })
  }
}
