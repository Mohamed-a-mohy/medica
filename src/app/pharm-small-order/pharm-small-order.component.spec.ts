import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmSmallOrderComponent } from './pharm-small-order.component';

describe('PharmSmallOrderComponent', () => {
  let component: PharmSmallOrderComponent;
  let fixture: ComponentFixture<PharmSmallOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmSmallOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmSmallOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
