import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoshettaFormComponent } from './roshetta-form.component';

describe('RoshettaFormComponent', () => {
  let component: RoshettaFormComponent;
  let fixture: ComponentFixture<RoshettaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoshettaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoshettaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
