import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResumeAdminComponent } from './view-resume-admin.component';

describe('ViewResumeAdminComponent', () => {
  let component: ViewResumeAdminComponent;
  let fixture: ComponentFixture<ViewResumeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResumeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResumeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
