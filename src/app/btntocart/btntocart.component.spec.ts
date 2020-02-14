import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtntocartComponent } from './btntocart.component';

describe('BtntocartComponent', () => {
  let component: BtntocartComponent;
  let fixture: ComponentFixture<BtntocartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtntocartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtntocartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
