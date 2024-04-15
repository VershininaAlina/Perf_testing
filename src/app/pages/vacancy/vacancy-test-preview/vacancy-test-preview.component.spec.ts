import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyTestPreviewComponent } from './vacancy-test-preview.component';

describe('VacancyTestPreviewComponent', () => {
  let component: VacancyTestPreviewComponent;
  let fixture: ComponentFixture<VacancyTestPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyTestPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacancyTestPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
