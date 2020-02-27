import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmItemComponent } from './confirm-item.component';

describe('ConfirmItemComponent', () => {
  let component: ConfirmItemComponent;
  let fixture: ComponentFixture<ConfirmItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
