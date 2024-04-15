import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-accept-green',
  standalone: true,
  imports: [],
  templateUrl: './button-accept-green.component.html',
  styleUrl: './button-accept-green.component.css'
})
export class ButtonAcceptGreenComponent {
  @Input() text: any
}
