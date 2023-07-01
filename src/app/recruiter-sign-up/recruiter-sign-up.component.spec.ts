import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSignUpComponent } from './recruiter-sign-up.component';

describe('RecruiterSignUpComponent', () => {
  let component: RecruiterSignUpComponent;
  let fixture: ComponentFixture<RecruiterSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
