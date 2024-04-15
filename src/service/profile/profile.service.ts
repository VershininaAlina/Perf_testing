import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";

@Injectable({providedIn: "root"})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  editProfile(obj: any): Observable<any> {
    return this.http.post(env.debug+"/profile", obj)
  }

}
