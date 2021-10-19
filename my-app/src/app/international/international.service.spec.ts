import { TestBed } from '@angular/core/testing';

import { InternationalService } from './international.service';

describe('InternationalService', () => {
  let service: InternationalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternationalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
