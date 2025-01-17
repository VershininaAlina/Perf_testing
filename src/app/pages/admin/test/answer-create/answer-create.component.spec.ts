import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerCreateComponent } from './answer-create.component';

describe('AnswerCreateComponent', () => {
  let component: AnswerCreateComponent;
  let fixture: ComponentFixture<AnswerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
