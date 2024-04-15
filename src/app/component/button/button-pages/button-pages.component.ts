import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router, ɵEmptyOutletComponent} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {routes} from "../../../app.routes";

@Component({
  selector: 'app-button-pages',
  standalone: true,
  imports: [
    ɵEmptyOutletComponent,
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './button-pages.component.html',
  styleUrl: './button-pages.component.css'
})
export class ButtonPagesComponent {

  @Input() count: any
  @Input() pageSize: any
  @Input() pageNumber: any
  @Input() url: any

  pagesNumber: any

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.pagesNumber = this.pageNumbers
  }

  get pageNumbers(): number[] {

    const totalPages = Math.ceil(this.count / this.pageSize);   // Общее количество страниц
    const nearbyPageCount = 3;   // Количество соседних страниц, которые вы хотите отобразить
    const result: number[] = [];

    // Определите диапазон номеров соседних страниц
    const startPage = Math.max(1, Number(this.pageNumber) - nearbyPageCount);   // Начальная страница
    const endPage = Math.min(totalPages, Number(this.pageNumber) + nearbyPageCount);   // Конечная страница

    // Создайте массив с номерами соседних страниц
    for (let page = startPage; page <= endPage; page++) {
      result.push(page);
    }

    return result;
  }

  goToPage(page: any) {
    this.router.navigate([this.url], {
      queryParams: {
        page: page,
      }
    })

    setTimeout(function () {
      window.location.reload()
    }, 200)


  }

  protected readonly Number = Number;
}
