import { TestBed, inject } from '@angular/core/testing';

import { ManageJobsService } from './manage-jobs.service';

describe('ManageJobsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageJobsService]
    });
  });

  it('should be created', inject([ManageJobsService], (service: ManageJobsService) => {
    expect(service).toBeTruthy();
  }));
});
