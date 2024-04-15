import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";

@Injectable({providedIn: "root"})
export class RespondService {
  constructor(private httpClient: HttpClient) {
  }

  respond(id: any): Observable<any> {
    return this.httpClient.post(env.debug+"/respond/vacancy?idVacancy=" + id, null)
  }

}
