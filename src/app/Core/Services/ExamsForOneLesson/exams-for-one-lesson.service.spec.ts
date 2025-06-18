import { TestBed } from '@angular/core/testing';

import { ExamsForOneLessonService } from './exams-for-one-lesson.service';

describe('ExamsForOneLessonService', () => {
  let service: ExamsForOneLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamsForOneLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
