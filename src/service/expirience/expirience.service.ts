import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../app/env/env";

@Injectable({providedIn: "root"})
export class ExpirienceService {

  constructor(private http: HttpClient) {
  }

  createExperience(data: any): Observable<any> {
    return this.http.post(env.debug+"/api/experience", data)
  }


  deleteExperience(id: any): Observable<any> {
    return this.http.delete(env.debug+"/api/experience/" + id);
  }

  editExperience(id: any, data: any): Observable<any> {
    return this.http.post(env.debug+"/api/experience/" + id, data)
  }
}
