import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionStagesComponent } from './selection-stages.component';

describe('SelectionStagesComponent', () => {
  let component: SelectionStagesComponent;
  let fixture: ComponentFixture<SelectionStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionStagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectionStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
