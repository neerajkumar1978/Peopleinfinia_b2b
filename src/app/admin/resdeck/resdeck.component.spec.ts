import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResdeckComponent } from './resdeck.component';

describe('ResdeckComponent', () => {
  let component: ResdeckComponent;
  let fixture: ComponentFixture<ResdeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResdeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResdeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
