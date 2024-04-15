import {Component, ElementRef} from '@angular/core';
import {ButtonAcceptComponent} from "../../../component/button/button-accept/button-accept.component";
import {AuthService} from "../../../../service/http/auth/auth.service";
import {TokenService} from "../../../../service/token.service";
import {AlertService} from "../../../../service/window/alert.service";
import {FormService} from "../../../../service/form.service";
import {HttpClient} from "@angular/common/http";
import {env} from "../../../env/env";

@Component({
  selector: 'app-photo-upload',
  standalone: true,
  providers: [
    FormService,
    AlertService
  ],
  imports: [
    ButtonAcceptComponent
  ],
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.css'
})
export class PhotoUploadComponent {

  clicked = false;

  selectedFile: File | null = null;

  constructor(private alertService: AlertService,
              private formService: FormService,
              private elementRef: ElementRef,
              private http: HttpClient) {

  }

  submit() {
    if (this.clicked) return;
    this.clicked = true;

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post(env.debug + '/profile/avatar', formData).subscribe(
        res => {
          window.location.reload()
        },
        err => {
          this.clicked = false;
          this.alertService.openPopup(err.error.message)

        }
      );
    } else {
      this.clicked = false;
    }

  }


  ///////////////////////////////////////////////////////////////////
  onInit(alertService: AlertService) {
    this.alertService = alertService;
  }

  onClick(event?: MouseEvent) {
    if (event != null) {
      if (event.target !== this.elementRef.nativeElement.querySelector("div.area")) {
        return;
      }
    }
    this.alertService.closePopup()
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.submit()
  }
}
