import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmViewComponent } from './pharm-view.component';

describe('PharmViewComponent', () => {
  let component: PharmViewComponent;
  let fixture: ComponentFixture<PharmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
