import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCampanyComponent } from './about-campany.component';

describe('AboutCampanyComponent', () => {
  let component: AboutCampanyComponent;
  let fixture: ComponentFixture<AboutCampanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCampanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutCampanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
