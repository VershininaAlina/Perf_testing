import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {TokenService} from "../service/token.service";

@Injectable({providedIn: 'root'})
export class NoAuthGuard implements CanActivate, CanActivateChild {
  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.tokenService.isAuth()) {

      return of(true)
    } else {
      this.router.navigate([''], {
        queryParams: {
          accessDenied: true
        }
      })
      return of(false)
    }

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state)
  }

}
