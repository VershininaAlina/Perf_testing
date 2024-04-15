import { Component } from '@angular/core';
import {TopPanelNoAuthComponent} from "../../component/top-panel/top-panel-no-auth/top-panel-no-auth.component";
import {RouterOutlet} from "@angular/router";
import {BottomPanelComponent} from "../../component/bottom-panel/bottom-panel/bottom-panel.component";
import {PanelComponent} from "../../component/top-panel/panel/panel.component";

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [
    TopPanelNoAuthComponent,
    RouterOutlet,
    BottomPanelComponent,
    PanelComponent
  ],
  templateUrl: './index-page.component.html',
  styleUrl: './index-page.component.css'
})
export class IndexPageComponent {

}
