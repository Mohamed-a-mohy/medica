import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelWarningComponent } from './cancel-warning.component';

describe('CancelWarningComponent', () => {
  let component: CancelWarningComponent;
  let fixture: ComponentFixture<CancelWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
