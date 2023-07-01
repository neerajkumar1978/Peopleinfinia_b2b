import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageJobsComponent } from './admin-manage-jobs.component';

describe('ManageJobsComponent', () => {
  let component: ManageJobsComponent;
  let fixture: ComponentFixture<AdminManageJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
