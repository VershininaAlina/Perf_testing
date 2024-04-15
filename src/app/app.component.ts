import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {async, map, Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {AsyncPipe, NgIf} from "@angular/common";
import {AlertService} from "../service/window/alert.service";


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    AlertService
  ],
  imports: [RouterOutlet,
    AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'hr-client';

  isMobileDevice: boolean;

  constructor(private alertService: AlertService) {
    this.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
  }

  ngOnInit(): void {
    if(this.isMobileDevice){
      this.alertService.openPopup("Войдите через компьютер!")
    }
  }

}
