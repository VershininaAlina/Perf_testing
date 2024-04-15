import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";


@Injectable({providedIn: 'root'})
export class NewsAdminService {

  constructor(private http: HttpClient) {
  }


  createNews(obj: any): Observable<any> {
    return this.http.post(env.debug+"/admin/news", obj)
  }

  deleteNews(id: any):Observable<any> {
    return this.http.delete(env.debug+"/admin/news/" + id);

  }
}
