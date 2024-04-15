import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {


  constructor(private elementRef: ElementRef) {
  }


  getData() {
    return this.elementRef.nativeElement.querySelector("input[type='text']").value
  }

  click() {

  }
}
