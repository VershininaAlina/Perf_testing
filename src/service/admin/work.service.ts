import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProfileService} from "../profile/profile.service";
import {UserService} from "../user/user.service";

@Injectable({providedIn: "root", useExisting: true})
export class WorkService {

  // @ts-ignore
  role: Role

  constructor(private http: HttpClient,
              private userService: UserService) {

    userService.getMe().subscribe(value => {
      // @ts-ignore
      this.role = Role[value.role];
    })
  }


}

export enum Role {
  ADMIN, USER, HR
}
