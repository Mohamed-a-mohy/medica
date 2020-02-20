import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoshettaDetailsComponent } from './roshetta-details.component';

describe('RoshettaDetailsComponent', () => {
  let component: RoshettaDetailsComponent;
  let fixture: ComponentFixture<RoshettaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoshettaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoshettaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
