import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSmallComponent } from './item-small.component';

describe('ItemSmallComponent', () => {
  let component: ItemSmallComponent;
  let fixture: ComponentFixture<ItemSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
