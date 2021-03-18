import { TestBed } from '@angular/core/testing';

import { MessageValidationService } from './message-validation.service';

describe('MessageValidationService', () => {
  let service: MessageValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
