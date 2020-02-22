import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarInHomeComponent } from './search-bar-in-home.component';

describe('SearchBarInHomeComponent', () => {
  let component: SearchBarInHomeComponent;
  let fixture: ComponentFixture<SearchBarInHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarInHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
