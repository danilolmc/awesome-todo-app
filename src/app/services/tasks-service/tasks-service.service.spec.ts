import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks-service.service';
import { Task } from 'src/app/core/Task';
import { tap } from 'rxjs/operators';


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

    const subscription = service.getTaskList().subscribe(list => {
      expect(list).toEqual(taskList);
    })

    const req = httpMock.expectOne(`${service.apiUrl}/tasks`)

    expect(req.request.method).toBe('GET');
    expect(spyGetTaskList).toBeCalledTimes(1);

    req.flush(taskList);

    httpMock.verify();

    subscription.unsubscribe();
  })

  test('should retrive active task list', () => {

    const spyGetActiveTaskList = jest.spyOn(service, 'getActiveTaskList');

    const subscritpion = service.getActiveTaskList().subscribe(list => {
      expect(list).toEqual(taskList);
    })

    const req = httpMock.expectOne(`${service.apiUrl}/tasks?status=active`)

    expect(req.request.method).toBe('GET');
    expect(spyGetActiveTaskList).toBeCalledTimes(1);

    req.flush(taskList);

    httpMock.verify();

    subscritpion.unsubscribe();
  })

  test('should retrive completed task list', () => {

    const spyGetCompletedTaskList = jest.spyOn(service, 'getCompletedTaskList');

    const subscription = service.getCompletedTaskList().subscribe(list => {
      expect(list).toEqual(taskList[1]);
    })

    const req = httpMock.expectOne(`${service.apiUrl}/tasks?status=completed`)

    expect(req.request.method).toBe('GET');
    expect(spyGetCompletedTaskList).toBeCalledTimes(1);

    req.flush(taskList[1]);

    httpMock.verify();

    subscription.unsubscribe();
  })

  test('should add a newTask', () => {

    const spyAddNewTask = jest.spyOn(service, 'addNewTask');

    const task: Task = {
      id: 248732,
      description: "Test",
      status: 'active'
    }

    service.addNewTask(task);

    const req = httpMock.expectOne({ url: `${service.apiUrl}/tasks`, method: 'POST' })

    expect(req.request.method).toBe('POST');
    expect(spyAddNewTask).toBeCalledTimes(1)

    req.flush(task)

    httpMock.verify();

  })

  it('shoud set task as completed', () => {

    const spysetTaskAsCompleted = jest.spyOn(service, 'setTaskAsCompleted');

    service.setTaskAsCompleted(2);

    const req = httpMock.expectOne({ url: `${service.apiUrl}/tasks/${2}`, method: 'PATCH' })

    expect(req.request.method).toBe('PATCH');
    expect(spysetTaskAsCompleted).toBeCalledTimes(1);
    expect(spysetTaskAsCompleted).toBeCalledWith(2)

    req.flush(2)
    httpMock.verify();

  })

  it('shoud unset task as active', () => {

    const spyunsetsetTaskAsCompleted = jest.spyOn(service, 'setTaskAsCompleted');

    service.setTaskAsCompleted(2);

    const req = httpMock.expectOne({ url: `${service.apiUrl}/tasks/${2}`, method: 'PATCH' })

    expect(req.request.method).toBe('PATCH');
    expect(spyunsetsetTaskAsCompleted).toBeCalledTimes(1);
    expect(spyunsetsetTaskAsCompleted).toBeCalledWith(2)

    req.flush(2)
    httpMock.verify();

  })

  test('shoud delete a task', () => {

    const spySetAsCompleted = jest.spyOn(service, 'deleteTask');

    const subscription = service.deleteTask(2).subscribe();

    const req = httpMock.expectOne({ url: `${service.apiUrl}/tasks/${2}`, method: 'DELETE' })

    expect(req.request.method).toBe('DELETE');
    expect(spySetAsCompleted).toBeCalledTimes(1);
    expect(spySetAsCompleted).toBeCalledWith(2)

    req.flush(2)
    httpMock.verify();

    subscription.unsubscribe();

  })
});
