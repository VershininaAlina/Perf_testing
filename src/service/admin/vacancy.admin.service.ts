import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";

@Injectable({providedIn: "root"})
export class VacancyAdminService {
  constructor(private http: HttpClient) {
  }

  create(obj: any): Observable<any> {
    return this.http.post(env.debug+"/admin/vacancies", obj);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(env.debug+"/admin/vacancies/" + id)
  }

  getAdminVacancy(pageNumber: any): Observable<any> {
    return this.http.get(env.debug+"/admin/vacancies/?pageNumber=" + pageNumber)
  }


  getAdminVacancyById(id: any): Observable<any> {
    return this.http.get(env.debug+"/admin/vacancies/byId/" + id)
  }


}
