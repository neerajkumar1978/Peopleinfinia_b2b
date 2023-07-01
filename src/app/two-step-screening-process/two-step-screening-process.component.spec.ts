import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoStepScreeningProcessComponent } from './two-step-screening-process.component';

describe('TwoStepScreeningProcessComponent', () => {
  let component: TwoStepScreeningProcessComponent;
  let fixture: ComponentFixture<TwoStepScreeningProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoStepScreeningProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoStepScreeningProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
