import { Component } from '@angular/core';
import {BottomPanelComponent} from "../../../component/bottom-panel/bottom-panel/bottom-panel.component";
import {RouterOutlet} from "@angular/router";
import {TopPanelComponent} from "../../../component/top-panel/top-panel/top-panel.component";
import {PanelComponent} from "../../../component/top-panel/panel/panel.component";

@Component({
  selector: 'app-test-index',
  standalone: true,
  imports: [
    BottomPanelComponent,
    RouterOutlet,
    TopPanelComponent,
    PanelComponent
  ],
  templateUrl: './test-index.component.html',
  styleUrl: './test-index.component.css'
})
export class TestIndexComponent {



}
