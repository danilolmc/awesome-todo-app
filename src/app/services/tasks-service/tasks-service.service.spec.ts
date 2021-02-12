import { TestBed } from '@angular/core/testing';

import { TasksServiceService } from './tasks-service.service';

describe('TasksServiceService', () => {
  let service: TasksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
