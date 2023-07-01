import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuiterManageJobsComponent } from './recuiter-manage-jobs.component';

describe('RecuiterManageJobsComponent', () => {
  let component: RecuiterManageJobsComponent;
  let fixture: ComponentFixture<RecuiterManageJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuiterManageJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuiterManageJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
