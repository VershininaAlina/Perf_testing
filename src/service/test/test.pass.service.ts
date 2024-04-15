import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";

@Injectable({providedIn: "root"})
export class TestPassService {

  constructor(private http: HttpClient) {
  }

  startTest(vacancyId: any, testId: any): Observable<any> {
    return this.http.post(env.debug+"/respond/start-test?idTest=" + testId + "&idVacancy=" + vacancyId, null)
  }

  endTest(vacancyId: any, testId: any): Observable<any> {
    return this.http.post(env.debug+"/respond/end-test?idTest=" + testId + "&idVacancy=" + vacancyId, null)
  }

  answer(obj: any, testId: any): Observable<any> {
    return this.http.post(env.debug+"/test/answer?testId=" + testId, obj)
  }
}
