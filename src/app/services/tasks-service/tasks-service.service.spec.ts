import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks-service.service';
import { Task } from 'src/app/core/Task';
import { HttpParams } from '@angular/common/http';


const taskList = [
  {
    id: 0,
    description: "MyTask",
    status: 'active',
  },
  {
    id: 1,
    description: "MyTask",
    status: 'completed',
  }
]


describe('TasksServiceService', () => {

  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });

    service = TestBed.get(TasksService);
    httpMock = TestBed.get(HttpTestingController);
  });


  test('should be created', () => {
    expect(service).toBeDefined();
    expect(httpMock).toBeDefined();
  });

  test('should retrive task list', () => {

    const spyGetTaskList = jest.spyOn(service, 'getTaskList');

    service.getTaskList().subscribe(list => {
      expect(list).toEqual(taskList);
    })

    const req = httpMock.expectOne(`${service.apiUrl}/tasks`)

    expect(req.request.method).toBe('GET');
    expect(spyGetTaskList).toBeCalledTimes(1);

    req.flush(taskList);

    httpMock.verify();
  })

  test('should retrive active task list', () => {

    const spyGetActiveTaskList = jest.spyOn(service, 'getActiveTaskList');

    service.getActiveTaskList().subscribe(list => {
      expect(list).toEqual(taskList);
    })

    const req = httpMock.expectOne(`${service.apiUrl}/tasks?status=active`)

    expect(req.request.method).toBe('GET');
    expect(spyGetActiveTaskList).toBeCalledTimes(1);

    req.flush(taskList);

    httpMock.verify();
  })

  test('should retrive completed task list', () => {

    const spyGetCompletedTaskList = jest.spyOn(service, 'getCompletedTaskList');

    service.getCompletedTaskList().subscribe(list => {
      expect(list).toEqual(taskList[1]);
    })

    const req = httpMock.expectOne(`${service.apiUrl}/tasks?status=completed`)

    expect(req.request.method).toBe('GET');
    expect(spyGetCompletedTaskList).toBeCalledTimes(1);

    req.flush(taskList[1]);

    httpMock.verify();
  })

  test('should add a newTask', () => {

    const spyAddNewTask = jest.spyOn(service, 'addNewTask');

    const task: Task = {
      id: 248732,
      description: "Test",
      status: 'active'
    }

    service.addNewTask(task).subscribe()

    const req = httpMock.expectOne({url:`${service.apiUrl}/tasks`, method: 'POST'})

    expect(req.request.method).toBe('POST');
    expect(spyAddNewTask).toBeCalledTimes(1)

    req.flush(task)

    httpMock.verify();


  })
});
