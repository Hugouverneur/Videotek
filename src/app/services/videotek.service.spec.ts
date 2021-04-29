import { TestBed } from '@angular/core/testing';

import { VideotekService } from './videotek.service';

describe('VideotekService', () => {
  let service: VideotekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideotekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
