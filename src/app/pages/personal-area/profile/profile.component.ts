import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {ButtonAcceptGreenComponent} from "../../../component/button/button-accept-green/button-accept-green.component";
import {ButtonKeepComponent} from "../../../component/button/button-keep/button-keep.component";
import {NgForOf, NgIf} from "@angular/common";
import {
  VacancyPreviewWithTestsComponent
} from "../../../component/vacancy/vacancy-preview-with-tests/vacancy-preview-with-tests.component";
import {UserAdminService} from "../../../../service/admin/user.admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {env} from "../../../env/env";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ButtonAcceptComponent,
    ButtonAcceptGreenComponent,
    ButtonKeepComponent,
    NgForOf,
    NgIf,
    VacancyPreviewWithTestsComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: any


  constructor(private userAdminService: UserAdminService,
              private route: ActivatedRoute,
              private router: Router,
              private elementRef: ElementRef) {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f5f5f5';

    let id = this.route.snapshot.params['id']
    this.userAdminService.getUserById(id).subscribe(value => {
      this.user = value;
    }, error => {
      this.router.navigate(['admin'])
    })
  }


  getProfilePhoto(): any {
    if (this.user == null) return null;
    if (this.user.photoProfile != null) {
      let image = this.user.photoProfile.link.replace("images/", "").replace("res/", "");

      return 'background-image: url("' + env.debug + '/profile/avatar?fileName=' + image +
        '")'
    }

    return null;
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';

  }
}
