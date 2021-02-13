import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks-service.service';
import {  HttpClientModule } from '@angular/common/http';
import {HttpTestingController, HttpClientTestingModule} from "@angular/common/http/testing"

describe('TasksServiceService', () => {

  let service:  TasksService;
  let httpMock : HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });

    service = TestBed.get(TasksService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeDefined();
    expect(httpMock).toBeDefined();
  });
});
