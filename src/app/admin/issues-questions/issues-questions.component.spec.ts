import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesQuestionsComponent } from './issues-questions.component';

describe('IssuesQuestionsComponent', () => {
  let component: IssuesQuestionsComponent;
  let fixture: ComponentFixture<IssuesQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
