import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../../app/env/env";

@Injectable({providedIn: "root"})
export class HrService {

  constructor(private http: HttpClient) {
  }

  reg(data: any): Observable<any> {
    return this.http.post(env.debug+"/admin/hr/signup", data)
  }

  getUsersHr(): Observable<any> {
    return this.http.get(env.debug+"/admin/hr/")
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(env.debug+"/admin/hr/" + id)
  }

  setRoleUser(id:any):Observable<any>{
    return this.http.get(env.debug+"/admin/hr/edit?id="+id+"&role=USER")
  }


  setRoleHR(id:any):Observable<any>{
    return this.http.get(env.debug+"/admin/hr/edit?id="+id+"&role=HR")
  }

}
