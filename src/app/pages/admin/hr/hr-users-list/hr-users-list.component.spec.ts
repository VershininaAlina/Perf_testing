import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrUsersListComponent } from './hr-users-list.component';

describe('HrUsersListComponent', () => {
  let component: HrUsersListComponent;
  let fixture: ComponentFixture<HrUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrUsersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
