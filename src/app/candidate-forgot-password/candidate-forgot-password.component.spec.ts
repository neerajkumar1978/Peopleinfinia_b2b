import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateForgotPasswordComponent } from './candidate-forgot-password.component';

describe('CandidateForgotPasswordComponent', () => {
  let component: CandidateForgotPasswordComponent;
  let fixture: ComponentFixture<CandidateForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
