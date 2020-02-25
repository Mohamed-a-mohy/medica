import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmDetailedOrderComponent } from './pharm-detailed-order.component';

describe('PharmDetailedOrderComponent', () => {
  let component: PharmDetailedOrderComponent;
  let fixture: ComponentFixture<PharmDetailedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmDetailedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmDetailedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
