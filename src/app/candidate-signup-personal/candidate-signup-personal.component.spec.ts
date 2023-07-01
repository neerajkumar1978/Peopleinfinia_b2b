import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateSignupPersonalComponent } from './candidate-signup-personal.component';

describe('CandidateSignupPersonalComponent', () => {
  let component: CandidateSignupPersonalComponent;
  let fixture: ComponentFixture<CandidateSignupPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateSignupPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateSignupPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
