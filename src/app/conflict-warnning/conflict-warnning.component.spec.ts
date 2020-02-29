import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictWarnningComponent } from './conflict-warnning.component';

describe('ConflictWarnningComponent', () => {
  let component: ConflictWarnningComponent;
  let fixture: ComponentFixture<ConflictWarnningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConflictWarnningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConflictWarnningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
