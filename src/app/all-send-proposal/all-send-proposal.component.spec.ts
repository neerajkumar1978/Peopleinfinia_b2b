import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSendProposalComponent } from './all-send-proposal.component';

describe('AllSendProposalComponent', () => {
  let component: AllSendProposalComponent;
  let fixture: ComponentFixture<AllSendProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSendProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSendProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
