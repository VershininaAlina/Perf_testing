import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-keep',
  standalone: true,
  imports: [],
  templateUrl: './button-keep.component.html',
  styleUrl: './button-keep.component.css'
})
export class ButtonKeepComponent {
  @Input() text: any
}
