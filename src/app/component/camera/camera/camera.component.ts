import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ButtonAcceptComponent} from "../../button/button-accept/button-accept.component";
import {Router} from "@angular/router";
import {TestPassService} from "../../../../service/test/test.pass.service";
import {AlertService} from "../../../../service/window/alert.service";


import {CameraService} from "../../../../service/camera/camera.service";
import {RxStompService, rxStompServiceFactory, StompConfig, StompService} from "@stomp/ng2-stompjs";
import {MessagingService} from "./service/messaging.service";


@Component({
  selector: 'app-camera',
  standalone: true,
  providers: [
    AlertService,
    CameraService,
    MessagingService
  ],

  imports: [
    FormsModule,
    ButtonAcceptComponent,
  ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent implements AfterViewInit, OnInit {
  @Input() startTest: any

  // @ts-ignore
  @ViewChild('video', {static: false}) videoElement: ElementRef;

  // @ts-ignore
  @ViewChild('mice') mice: ElementRef

  video: any;

  constructor(private router: Router,
              private testPassService: TestPassService,
              private alertService: AlertService,
              private cameraService: CameraService
  ) {


  }

  ngAfterViewInit(): void {
    this.requestCameraAccess()
  }

  private async requestCameraAccess() {
    this.video = this.videoElement?.nativeElement;
    this.video.volume = 1
    this.cameraService.initialize(this.video, this.mice)

  }


  navigateToStartTest() {
    let split = this.startTest.split("/");


  }

  ngOnInit(): void {

  }

  getCameraService(): CameraService {
    return this.cameraService;
  }


}

