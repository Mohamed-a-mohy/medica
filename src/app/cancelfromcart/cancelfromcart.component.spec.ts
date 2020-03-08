import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelfromcartComponent } from './cancelfromcart.component';

describe('CancelfromcartComponent', () => {
  let component: CancelfromcartComponent;
  let fixture: ComponentFixture<CancelfromcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelfromcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelfromcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
