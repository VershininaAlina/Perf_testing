import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyTestTaskComponent } from './vacancy-test-task.component';

describe('VacancyTestTaskComponent', () => {
  let component: VacancyTestTaskComponent;
  let fixture: ComponentFixture<VacancyTestTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyTestTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacancyTestTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
