import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonKeepComponent } from './button-keep.component';

describe('ButtonKeepComponent', () => {
  let component: ButtonKeepComponent;
  let fixture: ComponentFixture<ButtonKeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonKeepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonKeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
