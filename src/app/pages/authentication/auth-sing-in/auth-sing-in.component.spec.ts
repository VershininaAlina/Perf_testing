import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSingInComponent } from './auth-sing-in.component';

describe('AuthSingInComponent', () => {
  let component: AuthSingInComponent;
  let fixture: ComponentFixture<AuthSingInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSingInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthSingInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
