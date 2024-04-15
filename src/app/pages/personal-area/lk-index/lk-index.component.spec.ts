import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LkIndexComponent } from './lk-index.component';

describe('LkIndexComponent', () => {
  let component: LkIndexComponent;
  let fixture: ComponentFixture<LkIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LkIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LkIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
