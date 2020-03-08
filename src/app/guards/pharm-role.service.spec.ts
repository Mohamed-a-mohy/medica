import { TestBed } from '@angular/core/testing';

import { PharmRoleService } from './pharm-role.service';

describe('PharmRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharmRoleService = TestBed.get(PharmRoleService);
    expect(service).toBeTruthy();
  });
});
