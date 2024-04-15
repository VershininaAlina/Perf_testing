import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";

@Injectable({providedIn: 'root'})
export class UserAdminService {

  constructor(private http: HttpClient) {
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(env.debug+"/profile/" + id)
  }
}
