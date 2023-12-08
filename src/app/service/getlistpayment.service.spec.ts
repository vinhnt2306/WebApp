import { TestBed } from '@angular/core/testing';

import { GetlistpaymentService } from './getlistpayment.service';

describe('GetlistpaymentService', () => {
  let service: GetlistpaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetlistpaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
