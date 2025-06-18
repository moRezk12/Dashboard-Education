import { TestBed } from '@angular/core/testing';

import { ApiLessonService } from './api-lesson.service';

describe('ApiLessonService', () => {
  let service: ApiLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
