import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqJobProposalComponent } from './req-job-proposal.component';

describe('ReqJobProposalComponent', () => {
  let component: ReqJobProposalComponent;
  let fixture: ComponentFixture<ReqJobProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqJobProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqJobProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
