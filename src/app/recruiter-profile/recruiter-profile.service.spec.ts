import { TestBed, inject } from '@angular/core/testing';

import { RecruiterProfileService } from './recruiter-profile.service';

describe('RecruiterProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecruiterProfileService]
    });
  });

  it('should be created', inject([RecruiterProfileService], (service: RecruiterProfileService) => {
    expect(service).toBeTruthy();
  }));
});
