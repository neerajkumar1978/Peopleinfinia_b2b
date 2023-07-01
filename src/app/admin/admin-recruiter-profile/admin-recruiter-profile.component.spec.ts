import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecruiterProfileComponent } from './admin-recruiter-profile.component';

describe('AdminRecruiterProfileComponent', () => {
  let component: AdminRecruiterProfileComponent;
  let fixture: ComponentFixture<AdminRecruiterProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRecruiterProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecruiterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
