import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyAdminPreviewComponent } from './vacancy-admin-preview.component';

describe('VacancyAdminPreviewComponent', () => {
  let component: VacancyAdminPreviewComponent;
  let fixture: ComponentFixture<VacancyAdminPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyAdminPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacancyAdminPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
