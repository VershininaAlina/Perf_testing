import {Component, ElementRef, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../../service/token.service";

@Component({
  selector: 'app-selection-stages',
  standalone: true,
  imports: [],
  templateUrl: './selection-stages.component.html',
  styleUrl: './selection-stages.component.css'
})
export class SelectionStagesComponent implements OnDestroy {

  constructor(private elementRef: ElementRef,
              private router: Router,
              private tokenService: TokenService) {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(0, 173, 239)';
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';

  }


  navigateToAuth() {

  }
}
