import { TestBed } from '@angular/core/testing';

import { PharmServiceService } from './pharm-service.service';

describe('PharmServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharmServiceService = TestBed.get(PharmServiceService);
    expect(service).toBeTruthy();
  });
});
