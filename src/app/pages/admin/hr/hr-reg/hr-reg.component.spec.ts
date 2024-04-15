import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRegComponent } from './hr-reg.component';

describe('HrRegComponent', () => {
  let component: HrRegComponent;
  let fixture: ComponentFixture<HrRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
