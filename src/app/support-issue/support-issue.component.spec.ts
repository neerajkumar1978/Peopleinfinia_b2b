import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportIssueComponent } from './support-issue.component';

describe('SupportIssueComponent', () => {
  let component: SupportIssueComponent;
  let fixture: ComponentFixture<SupportIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
