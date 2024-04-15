import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Form} from "@angular/forms";
import {Observable} from "rxjs";
import {env} from "../../../app/env/env";

@Injectable({providedIn: "root"})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  auth(data: any): Observable<any> {
    return this.httpClient.post(env.debug+"/api/auth/signin", data)
  }

  reg(data: any): Observable<any> {
    return this.httpClient.post(env.debug+"/api/auth/signup", data)
  }

}
