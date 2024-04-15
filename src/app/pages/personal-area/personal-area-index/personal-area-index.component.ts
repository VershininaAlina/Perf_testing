import { Component } from '@angular/core';
import {TopPanelComponent} from "../../../component/top-panel/top-panel/top-panel.component";
import {RouterOutlet} from "@angular/router";
import {BottomPanelComponent} from "../../../component/bottom-panel/bottom-panel/bottom-panel.component";
import {PanelComponent} from "../../../component/top-panel/panel/panel.component";

@Component({
  selector: 'app-personal-area-index',
  standalone: true,
  imports: [
    TopPanelComponent,
    RouterOutlet,
    BottomPanelComponent,
    PanelComponent
  ],
  templateUrl: './personal-area-index.component.html',
  styleUrl: './personal-area-index.component.css'
})
export class PersonalAreaIndexComponent {

}
