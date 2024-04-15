import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";

@Injectable({providedIn: "root"})
export class VacancyService {
  constructor(private http: HttpClient) {
  }

  getVacancyList(page: any): Observable<any> {
    return this.http.get(env.debug+"/vacancies?pageNumber=" + page)
  }

  getVacancyListSize(): Observable<any> {
    return this.http.get(env.debug+"/vacancies/count")
  }

  getVacancy(id: number): Observable<any> {
    return this.http.get(env.debug+"/vacancies/" + id)
  }
}
