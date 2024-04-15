import {Component} from '@angular/core';
import {AuthService} from "../../../../service/http/auth/auth.service";
import {Token} from "@angular/compiler";
import {TokenService} from "../../../../service/token.service";
import {NgIf} from "@angular/common";
import {TopPanelComponent} from "../top-panel/top-panel.component";
import {TopPanelNoAuthComponent} from "../top-panel-no-auth/top-panel-no-auth.component";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    NgIf,
    TopPanelComponent,
    TopPanelNoAuthComponent
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {


  constructor(private tokenService: TokenService) {
  }

  isAuth(): boolean {
    return this.tokenService.isAuth();
  }
}
