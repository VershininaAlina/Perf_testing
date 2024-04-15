import {ElementRef, Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {MessagingService} from "../../app/component/camera/camera/service/messaging.service";
import {CameraComponent} from "../../app/component/camera/camera/camera.component";
import {AlertService} from "../window/alert.service";

@Injectable({providedIn: "root", useExisting: true})
export class CameraService {

  access = false;

  videoRecording = false;
  sendVideoOnServer = false;


  private videoMirror = true;

  private video: any;

  //@ts-ignore
  private mediaStream: MediaStream

  // @ts-ignore
  private mediaRecorder: MediaRecorder

  private constraints: MediaStreamConstraints = {video: true, audio: true}

  private recorderOptions = {
    mimeType: 'video/webm;codecs=opus,vp8',
    videoBitsPerSecond: 200000,
    audioBitsPerSecond: 250000,
  };

  constructor(private messagingService: MessagingService,
              private alertService: AlertService) {
  }

  public async initialize(video: any, mice: ElementRef) {
    try {
      this.video = video;
      // console.log(this.constraints)
      this.mediaStream = await navigator.mediaDevices.getUserMedia(this.constraints);

      this.video.srcObject = this.mediaStream;


      mice.nativeElement.innerHTML = "";
      let devices = await navigator.mediaDevices.enumerateDevices();
      let audioDevices = devices.filter(device => device.kind === 'audioinput');

      let div = document.createElement('div');

      // Создаем выпадающий список для выбора устройства микрофона
      let select = document.createElement('select');
      select.style.width = "calc(100% - 10px)"
      select.style.height = "52px"
      select.style.marginTop = "5px"
      select.style.fontSize = "18px"
      select.style.padding = "0px 10px"

      audioDevices.forEach(device => {

        let option = document.createElement('option');
        option.text = device.label || `Microphone ${select.length + 1}`;
        option.value = device.deviceId;


        // @ts-ignore
        if (this.constraints.audio.deviceId != null) {
          // @ts-ignore
          if (this.constraints.audio.deviceId == option.value) {
            option.selected = true;
          }
        }

        select.appendChild(option);
      });
      let obj = this;
      select.addEventListener('change', () => {
        let selectedDevice = select.value;
        this.constraints.audio = {deviceId: selectedDevice};
        obj.restartMediaStream(video, mice)
      });
      div.appendChild(select);
      mice.nativeElement.appendChild(div)


      let videoDevices = devices.filter(device => device.kind === 'videoinput');
      let divVideo = document.createElement('div');

      // Create a dropdown list for selecting the video camera device
      let selectVideo = document.createElement('select');
      selectVideo.style.width = "calc(100% - 10px)";
      selectVideo.style.height = "52px";
      selectVideo.style.marginTop = "5px";
      selectVideo.style.fontSize = "18px";
      selectVideo.style.padding = "0px 10px";


      videoDevices.forEach(device => {
        let option = document.createElement('option');
        option.text = device.label || `Camera ${selectVideo.length + 1}`;
        option.value = device.deviceId;

        // @ts-ignore
        if (this.constraints.video.deviceId != null && this.constraints.video.deviceId == option.value) {
          option.selected = true;
        }

        selectVideo.appendChild(option);
      });

      selectVideo.addEventListener('change', () => {
        let selectedVideoDevice = selectVideo.value;
        this.constraints.video = {deviceId: selectedVideoDevice};
        obj.restartMediaStream(video, mice);
      });
      /*
            let option = document.createElement('option');
            option.text = "Выберите камеру"
            option.value = "Текст"
            option.selected = true;
            selectVideo.appendChild(option)

       */

      divVideo.appendChild(selectVideo)
      mice.nativeElement.appendChild(divVideo);

      if (this.video) {
        this.video.addEventListener('playing', () => {
          if (this.videoMirror) {
            const scale = this.video.videoWidth / this.video.clientWidth;
            const transform = `scaleX(${-scale})`;
            this.video.style.transform = transform;
          }
        });
      }

      this.videoRecording = true;

      this.mediaRecorder = new MediaRecorder(this.mediaStream, this.recorderOptions);

      this.mediaRecorder.ondataavailable = async (event) => {
        //  console.log("DATA")
        if (event.data.size > 0) {
          const {data} = event;
          const base64Data = await this.blobToBase64(data);
          // @ts-ignore
          const sendDataVideo = base64Data.split(",")[2];

          this.messagingService.sendVideoThread(sendDataVideo)
        }
      };

      this.access = true;
    } catch (e) {
      console.log(e)
      this.access = false;
      this.alertService.openPopup("Необходимо дать доступ к камере")
    }

  }

  restartMediaStream(video: any, mice: ElementRef) {
    this.stopCamera()
    video.srcObject = null;
    this.initialize(video, mice)
  }

  public connect() {
    this.video.volume = 0;
    this.messagingService.connect(this)
  }

  public startVideoCapture(): void {
    this.startSend();
    this.sendVideoOnServer = true;
  }


  public stopVideoCapture(): void {
    if (this.sendVideoOnServer == false) return;
    this.stopSend()
    this.stopCamera();
    this.endTest()
    this.sendVideoOnServer = false;

  }

  public endTest(): void {
    this.messagingService.disconnect()
  }

  private blobToBase64(blob: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private startSend() {
    this.mediaRecorder.start(160);
  }

  private stopSend() {
    this.mediaRecorder.stop()
  }


  private stopCamera() {
    this.mediaStream.getTracks().forEach(track => track.stop());
  }
}
