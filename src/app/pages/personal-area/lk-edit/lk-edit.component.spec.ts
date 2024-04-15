import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LkEditComponent } from './lk-edit.component';

describe('LkEditComponent', () => {
  let component: LkEditComponent;
  let fixture: ComponentFixture<LkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LkEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
