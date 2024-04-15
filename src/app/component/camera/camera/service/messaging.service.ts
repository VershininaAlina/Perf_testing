import {Injectable} from '@angular/core';
import {Client} from '@stomp/stompjs';
// @ts-ignore
import SockJS from 'sockjs-client/dist/sockjs.js';
import {StompHeaders} from "@stomp/rx-stomp";
import {TokenService} from "../../../../../service/token.service";
import {CameraComponent} from "../camera.component";
import {CameraService} from "../../../../../service/camera/camera.service";
import {env} from "../../../../env/env";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  // @ts-ignore
  private stompClient: Client;

  auth = false;

  constructor(private tokenService: TokenService) {
  }

  connect(cameraService: CameraService): void {
    const socket: any = new SockJS(env.debug + '/task');
    socket.withCredentials = true;
    socket.binary = true;

    this.stompClient = new Client({
      webSocketFactory: () => socket
    });


    // @ts-ignore
    this.stompClient.webSocketFactory = () => socket;
    //this.stompClient.debug = (str) => console.log(str);


    this.stompClient.onStompError = (frame) => {
      console.log("STOMP error: " + frame);
    }
    this.stompClient.onChangeState = (state) => {
      console.log(state)
    }
    this.stompClient.onDisconnect = (frame) => {
      console.log("Disconnect: " + frame)
    }
    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      const headers: StompHeaders = {
        Authorization: "Bearer " + this.tokenService.getToken()
      };

      // authentication with jwt token
      this.stompClient.subscribe(
        '/topic/user/message',
        (messageOutput: any) => {
          this.showMessageOutput(JSON.parse(messageOutput.body));
        },
        headers
      );
      this.stompClient.onDisconnect = (frame) => {
        console.log("Disconnect: " + frame)
      }

      this.auth = true;

      socket.onclose = function () {
        console.log("Closed connection 74")
      }

      socket.onerror = function(e:any) {
       socket.onerror(e);
      }
      cameraService.startVideoCapture()
    };

    this.stompClient.onDisconnect = (frame) => {
      console.log("Disconnect: " + frame)
    }
    this.stompClient.activate();
  }

  public isAuth(): boolean {
    return this.auth;
  }


  private showMessageOutput(message: any): void {
    console.log('Got a message!');
    console.log(message);
  }

  sendVideoThread(data: any) {
    if (this.stompClient.connected) {
      this.stompClient.publish({destination: '/app/video_thread', body: data});
    }
  }


  disconnect() {
    try {
      this.stompClient.deactivate()
      // this.stompClient.forceDisconnect()
      console.log("STOMP disconnect")
    } catch (e) {
      console.log("Cannot disconnect")
    }
  }
}
