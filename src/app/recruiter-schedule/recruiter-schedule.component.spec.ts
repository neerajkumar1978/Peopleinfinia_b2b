import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterScheduleComponent } from './recruiter-schedule.component';

describe('RecruiterScheduleComponent', () => {
  let component: RecruiterScheduleComponent;
  let fixture: ComponentFixture<RecruiterScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
