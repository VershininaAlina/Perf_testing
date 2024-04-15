import {Injectable} from "@angular/core";


@Injectable({providedIn: "root"})
export class TokenService {

  constructor() {
  }


  isAuth() {
    return localStorage.getItem("token") != null
  }

  saveToken(token: any) {
    localStorage.setItem("token", token);
  }

  getToken(): any {
    return localStorage.getItem("token")
  }

  clear() {
    localStorage.clear()
    window.location.reload()
  }
}
