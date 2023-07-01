import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAndMatchComponent } from './search-and-match.component';

describe('SearchAndMatchComponent', () => {
  let component: SearchAndMatchComponent;
  let fixture: ComponentFixture<SearchAndMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAndMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
