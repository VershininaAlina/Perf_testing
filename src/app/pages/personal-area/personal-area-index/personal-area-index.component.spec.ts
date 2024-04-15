import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAreaIndexComponent } from './personal-area-index.component';

describe('PersonalAreaIndexComponent', () => {
  let component: PersonalAreaIndexComponent;
  let fixture: ComponentFixture<PersonalAreaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalAreaIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalAreaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
