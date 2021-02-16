import { TestBed } from '@angular/core/testing';

import { ToggleTaskService } from './toggle-task.service';

describe('ToggleTaskService', () => {
  let service: ToggleTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
