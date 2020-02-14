import { TestBed } from '@angular/core/testing';

import { QuantityService } from './quantity.service';

describe('QuantityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantityService = TestBed.get(QuantityService);
    expect(service).toBeTruthy();
  });
});
