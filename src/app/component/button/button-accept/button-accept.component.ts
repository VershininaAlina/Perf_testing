import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-accept',
  standalone: true,
  imports: [],
  templateUrl: './button-accept.component.html',
  styleUrl: './button-accept.component.css'
})
export class ButtonAcceptComponent {
  @Input() text: any
}
