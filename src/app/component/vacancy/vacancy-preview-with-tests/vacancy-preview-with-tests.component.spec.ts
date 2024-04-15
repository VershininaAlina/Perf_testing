import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyPreviewWithTestsComponent } from './vacancy-preview-with-tests.component';

describe('VacancyPreviewWithTestsComponent', () => {
  let component: VacancyPreviewWithTestsComponent;
  let fixture: ComponentFixture<VacancyPreviewWithTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyPreviewWithTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacancyPreviewWithTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
