import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateSignupEmploymentComponent } from './candidate-signup-employment.component';

describe('CandidateSignupEmploymentComponent', () => {
  let component: CandidateSignupEmploymentComponent;
  let fixture: ComponentFixture<CandidateSignupEmploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateSignupEmploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateSignupEmploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
