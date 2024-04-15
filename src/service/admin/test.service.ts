import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";

@Injectable({providedIn: "root"})
export class TestService {



  constructor(private http: HttpClient) {
  }

  createTest(vacancyId:any,obj:any) :Observable<any>{
    return this.http.post(env.debug+"/admin/vacancies/"+vacancyId+"/tests",obj)
  }

}
