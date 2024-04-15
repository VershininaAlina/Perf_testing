import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAcceptGreenComponent } from './button-accept-green.component';

describe('ButtonAcceptGreenComponent', () => {
  let component: ButtonAcceptGreenComponent;
  let fixture: ComponentFixture<ButtonAcceptGreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAcceptGreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAcceptGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
