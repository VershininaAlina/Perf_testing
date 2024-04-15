import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyPreviewComponent } from './vacancy-preview.component';

describe('VacancyPreviewComponent', () => {
  let component: VacancyPreviewComponent;
  let fixture: ComponentFixture<VacancyPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacancyPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
