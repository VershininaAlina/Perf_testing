import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyViewRespondComponent } from './vacancy-view-respond.component';

describe('VacancyViewRespondComponent', () => {
  let component: VacancyViewRespondComponent;
  let fixture: ComponentFixture<VacancyViewRespondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyViewRespondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacancyViewRespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
