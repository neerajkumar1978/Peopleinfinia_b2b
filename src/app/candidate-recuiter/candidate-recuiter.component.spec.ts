import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateRecuiterComponent } from './candidate-recuiter.component';

describe('CandidateRecuiterComponent', () => {
  let component: CandidateRecuiterComponent;
  let fixture: ComponentFixture<CandidateRecuiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateRecuiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateRecuiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
