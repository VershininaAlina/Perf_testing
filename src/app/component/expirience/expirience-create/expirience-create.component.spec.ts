import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirienceCreateComponent } from './expirience-create.component';

describe('ExpirienceCreateComponent', () => {
  let component: ExpirienceCreateComponent;
  let fixture: ComponentFixture<ExpirienceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpirienceCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpirienceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
