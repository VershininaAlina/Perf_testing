import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../service/token.service";

@Injectable({providedIn: "root"})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenService.isAuth()) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + this.tokenService.getToken()
        }
      })
    }
    return next.handle(req);
  }


}
