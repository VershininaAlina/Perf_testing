import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-accept-big',
  standalone: true,
  imports: [],
  templateUrl: './button-accept-big.component.html',
  styleUrl: './button-accept-big.component.css'
})
export class ButtonAcceptBigComponent {
  @Input() text: any
}
