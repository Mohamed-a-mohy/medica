import { TestBed } from '@angular/core/testing';

import { PagerserviceService } from './pagerservice.service';

describe('PagerserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagerserviceService = TestBed.get(PagerserviceService);
    expect(service).toBeTruthy();
  });
});
