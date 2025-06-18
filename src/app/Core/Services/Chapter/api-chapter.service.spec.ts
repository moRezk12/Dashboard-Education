import { TestBed } from '@angular/core/testing';

import { ApiChapterService } from './api-chapter.service';

describe('ApiChapterService', () => {
  let service: ApiChapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiChapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
