import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAcceptBigComponent } from './button-accept-big.component';

describe('ButtonAcceptBigComponent', () => {
  let component: ButtonAcceptBigComponent;
  let fixture: ComponentFixture<ButtonAcceptBigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAcceptBigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAcceptBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
