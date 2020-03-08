import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummeryviewComponent } from './summeryview.component';

describe('SummeryviewComponent', () => {
  let component: SummeryviewComponent;
  let fixture: ComponentFixture<SummeryviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummeryviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummeryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
