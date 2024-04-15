import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";

@Injectable({providedIn: "root"})
export class NewsService {

  constructor(private http: HttpClient) {
  }

  getNews(pageNumber: any): Observable<any> {
    return this.http.get(env.debug + "/api/news?pageNumber=" + pageNumber);
  }


  getNew(id: any): Observable<any> {
    return this.http.get(env.debug + "/api/news/" + id);
  }

  getCount(): Observable<any> {
    return this.http.get(env.debug + "/api/news/count")
  }

  findNews(q: any, page: any) {
    return this.http.get(env.debug + "/api/news/search?q=" + q + "&page=" + page)
  }

  countFindNews(q: any) {
    return this.http.get(env.debug + "/api/news/count-search?q=" + q)
  }
}
