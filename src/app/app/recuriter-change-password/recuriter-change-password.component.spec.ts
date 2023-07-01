import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuriterChangePasswordComponent } from './recuriter-change-password.component';

describe('RecuriterChangePasswordComponent', () => {
  let component: RecuriterChangePasswordComponent;
  let fixture: ComponentFixture<RecuriterChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuriterChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuriterChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
