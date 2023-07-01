import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateSignupTypeComponent } from './candidate-signup-type.component';

describe('CandidateSignupTypeComponent', () => {
  let component: CandidateSignupTypeComponent;
  let fixture: ComponentFixture<CandidateSignupTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateSignupTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateSignupTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
