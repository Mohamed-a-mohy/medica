import { TestBed } from '@angular/core/testing';

import { GetProductsDataService } from './get-products-data.service';

describe('GetProductsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetProductsDataService = TestBed.get(GetProductsDataService);
    expect(service).toBeTruthy();
  });
});
