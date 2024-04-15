import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyIndexComponent } from './vacancy-index.component';

describe('VacancyIndexComponent', () => {
  let component: VacancyIndexComponent;
  let fixture: ComponentFixture<VacancyIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacancyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
