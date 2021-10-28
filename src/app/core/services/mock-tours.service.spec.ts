import { TestBed } from '@angular/core/testing';

import { MockToursService } from './mock-tours.service';

describe('MockToursService', () => {
  let service: MockToursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockToursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
