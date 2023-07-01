import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HugeTalentPoolComponent } from './huge-talent-pool.component';

describe('HugeTalentPoolComponent', () => {
  let component: HugeTalentPoolComponent;
  let fixture: ComponentFixture<HugeTalentPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HugeTalentPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HugeTalentPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
