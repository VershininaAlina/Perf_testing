import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPanelNoAuthComponent } from './top-panel-no-auth.component';

describe('TopPanelNoAuthComponent', () => {
  let component: TopPanelNoAuthComponent;
  let fixture: ComponentFixture<TopPanelNoAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPanelNoAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopPanelNoAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
