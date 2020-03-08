import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoshettaShowComponent } from './roshetta-show.component';

describe('RoshettaShowComponent', () => {
  let component: RoshettaShowComponent;
  let fixture: ComponentFixture<RoshettaShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoshettaShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoshettaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
