import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";


@Injectable({providedIn: "root"})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getMe(): Observable<any> {
    return this.http.get(env.debug+"/profile")
  }

  getTestPassed(): Observable<any> {
    return this.http.get(env.debug+"/profile/my-test-passed")
  }

}
