import { TestBed } from '@angular/core/testing';

import { NotPharmRoleService } from './not-pharm-role.service';

describe('NotPharmRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotPharmRoleService = TestBed.get(NotPharmRoleService);
    expect(service).toBeTruthy();
  });
});
