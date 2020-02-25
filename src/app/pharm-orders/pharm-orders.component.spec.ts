import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmOrdersComponent } from './pharm-orders.component';

describe('PharmOrdersComponent', () => {
  let component: PharmOrdersComponent;
  let fixture: ComponentFixture<PharmOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
