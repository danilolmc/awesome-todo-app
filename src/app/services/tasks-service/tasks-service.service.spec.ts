import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Task } from 'src/app/core/Task';
import { TasksService } from './tasks-service.service';


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

    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  test('should be created', () => {
    expect(service).toBeDefined();
    expect(httpMock).toBeDefined();
  });

  test('should retrive task list', fakeAsync(() => {

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

    tick();
  }))

  test('should retrive active task list', fakeAsync(() => {

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

    tick();
  }))

  test('should retrive completed task list', fakeAsync(() => {

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

    tick();
  }))

  test('should add a newTask', fakeAsync(() => {

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

    tick()

  }))

  it('shoud set task as completed', fakeAsync(() => {

    const spysetTaskAsCompleted = jest.spyOn(service, 'setTaskAsCompleted');

    service.setTaskAsCompleted(2);

    const req = httpMock.expectOne({ url: `${service.apiUrl}/tasks/${2}`, method: 'PATCH' })

    expect(req.request.method).toBe('PATCH');
    expect(spysetTaskAsCompleted).toBeCalledTimes(1);
    expect(spysetTaskAsCompleted).toBeCalledWith(2)

    req.flush(2)
    httpMock.verify();

    tick();

  }))

  it('shoud unset task as completed', fakeAsync(() => {

    const spyunsetTaskAsCompleted = jest.spyOn(service, 'unsetTaskAsCompleted');

    service.unsetTaskAsCompleted(2);

    const req = httpMock.expectOne({ url: `${service.apiUrl}/tasks/${2}`, method: 'PATCH' })

    expect(req.request.method).toBe('PATCH');
    expect(spyunsetTaskAsCompleted).toBeCalledTimes(1);
    expect(spyunsetTaskAsCompleted).toBeCalledWith(2)

    req.flush(2)
    httpMock.verify();

    tick();
  }))

  test('shoud delete a task', fakeAsync(() => {

    const spySetAsCompleted = jest.spyOn(service, 'deleteTask');

    const subscription = service.deleteTask(2).subscribe();

    const req = httpMock.expectOne({ url: `${service.apiUrl}/tasks/${2}`, method: 'DELETE' })

    expect(req.request.method).toBe('DELETE');
    expect(spySetAsCompleted).toBeCalledTimes(1);
    expect(spySetAsCompleted).toBeCalledWith(2)

    req.flush(2)
    httpMock.verify();

    subscription.unsubscribe();

    tick();

  }))

  test('shoud delete completed tasks', fakeAsync(() => {

    const spyDeleteCompletedTasks = jest.spyOn(service, 'deleteCompleted');

    service.deleteCompleted([1,2,3]);

    const reqA = httpMock.expectOne({ url: `${service.apiUrl}/tasks/${1}`, method: 'DELETE' })
    const reqB = httpMock.expectOne({ url: `${service.apiUrl}/tasks/${2}`, method: 'DELETE' })
    const reqC = httpMock.expectOne({ url: `${service.apiUrl}/tasks/${3}`, method: 'DELETE' })

    expect(reqA.request.method).toBe('DELETE');
    expect(reqB.request.method).toBe('DELETE');
    expect(reqC.request.method).toBe('DELETE');


    expect(spyDeleteCompletedTasks).toBeCalledTimes(1);
    expect(spyDeleteCompletedTasks).toBeCalledWith([1,2,3])

    reqA.flush([1,2,3])
    httpMock.verify();

    tick();
  }))
});
