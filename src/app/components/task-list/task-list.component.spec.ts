import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { TasksService } from '../../services/tasks-service/tasks-service.service';
import { TaskItemModule } from '../task-item/task-item.module';
import { TaskListComponent } from './task-list.component';



describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const taskList: Task[] = [
    {
      id: 0,
      description: 'MyTask',
      status: 'active'
    },
    {
      id: 1,
      description: 'MyTask',
      status: 'completed'
    }
  ];

  const taskService = {

    addTaskEventEmitter: new EventEmitter<Task>(),
    updateTaskEventEmitter: new EventEmitter<Task>(),
    deleteTaskEventEmitter: new EventEmitter<Task>(),

    getTaskList: jest.fn().mockReturnValue(of(taskList)),
    getActiveTaskList: jest.fn().mockReturnValue(of(taskList.filter(task => task.status === 'active')[0])),
    getCompletedTaskList: jest.fn().mockReturnValue(of(taskList.filter(task => task.status === 'completed'))),
    deleteCompleted: jest.fn((tasks) => tasks).mockReturnValue(new EventEmitter<boolean>()),
    addNewTask: jest.fn(),
    setTaskAsCompleted: jest.fn(),
    unsetTaskAsCompleted: jest.fn(),
    deleteTask: jest.fn(),
    clearCompleted: jest.fn()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [TaskItemModule],
      providers: [
        {
          provide: TasksService, useValue: taskService,
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
      .catch(() => { });

  }));


  beforeEach(() => { });

  it('should create', () => {


    expect(component).toBeDefined();

  });

  test('should retrieve task list', async () => {

    const spyGetTaskList = jest.spyOn(component, 'getTaskList');

    let list: Task[] = [];

    component.getTaskList();

    await fixture.whenStable();

    fixture.detectChanges();

    list = component.taskList;

    expect(list).toBe(taskList);
    expect(taskService.getTaskList).toBeCalled();
    expect(spyGetTaskList).toBeCalledTimes(1);

  });

  test('should retrieve only active tasks list', async () => {

    const spyGetActiveTaskList = jest.spyOn(component, 'getActiveTaskList');

    let list: Task[] = [];

    component.getActiveTaskList();

    await fixture.whenStable();

    list = component.taskList;

    expect(list).toBe(taskList[0]);
    expect(taskService.getActiveTaskList).toBeCalled();
    expect(spyGetActiveTaskList).toBeCalledTimes(1);

  });

  test('should retrieve only completed tasks list', async () => {


    const spyGetCompletedTaskList = jest.spyOn(component, 'getCompletedTaskList');

    let list: Task[] = [];

    component.getCompletedTaskList();

    await fixture.whenStable();

    list = component.taskList;

    expect(list).toHaveLength(1);
    expect(taskService.getCompletedTaskList).toBeCalled();
    expect(spyGetCompletedTaskList).toBeCalledTimes(1);

  });

  test('should clear items completed', async () => {

    const spyclearCompleted = jest.spyOn(component, 'clearCompleted');

    component.clearCompleted();

    taskService.deleteCompleted([1, 2, 3]);

    await fixture.whenStable();

    expect(spyclearCompleted).toBeCalled();
    expect(taskService.getCompletedTaskList).toBeCalled();
    expect(taskService.deleteCompleted).toBeCalled();
    expect(taskService.deleteCompleted).toBeCalledWith([1, 2, 3]);

  });

});
