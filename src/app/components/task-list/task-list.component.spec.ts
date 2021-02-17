import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { TaskList } from 'src/app/core/TaskList';
import { TasksService } from "../../services/tasks-service/tasks-service.service";
import { TaskItemModule } from '../task-item/task-item.module';
import { TaskListComponent } from './task-list.component';
import { tap } from "rxjs/operators";
import { EventEmitter } from '@angular/core';



describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const taskList: Task[] = [
    {
      id: 0,
      description: "MyTask",
      status: 'active'
    },
    {
      id: 0,
      description: "MyTask",
      status: 'completed'
    }
  ]

  const taskService = {

    getTaskList: jest.fn().mockReturnValue(of(taskList)),
    getActiveTaskList: jest.fn().mockReturnValue(of(taskList.filter(task => task.status === 'active'))),
    getCompletedTaskList: jest.fn().mockReturnValue(of(taskList.filter(task => task.status === 'completed'))),
    deleteCompleted: jest.fn((tasks) => tasks).mockReturnValue(new EventEmitter<boolean>()),
    eventEmitter: jest.fn().mockReturnValue({})
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [TaskItemModule],
      providers: [
        {
          provide: TasksService, useValue: taskService
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
      .catch(() => {})

  }));


  beforeEach(() => { })

  it('should create', () => {

    expect(component).toBeDefined();

  });

  test('should retrieve task list', () => {

    const spyGetTaskList = jest.spyOn(component, 'getTaskList');

    let list :  Task[] = [];

    component.getTaskList();

    list = component.taskList;

    expect(list).toHaveLength(2)
    expect(taskService.getTaskList).toBeCalled()
    expect(spyGetTaskList).toBeCalledTimes(1);

  })

  test('should retrieve only active tasks list', () => {

    const spyGetActiveTaskList = jest.spyOn(component, 'getActiveTaskList');

    let list :  Task[] = [];

    component.getActiveTaskList();

    list = component.taskList;

    expect(list).toHaveLength(1)
    expect(taskService.getActiveTaskList).toBeCalled()
    expect(spyGetActiveTaskList).toBeCalledTimes(1)

  })

  test('should retrieve only completed tasks list', () => {

    const spyGetCompletedTaskList = jest.spyOn(component, 'getCompletedTaskList');

    let list : Task[] = [];

    component.getCompletedTaskList();

    list = component.taskList;

    expect(list).toHaveLength(1)
    expect(taskService.getCompletedTaskList,).toBeCalled()
    expect(spyGetCompletedTaskList).toBeCalledTimes(1)

  })

  test('should clear items completed', () => {

    const spyclearCompleted =  jest.spyOn(component, 'clearCompleted');

    component.clearCompleted();

    taskService.deleteCompleted([1,2,3]);

    expect(spyclearCompleted).toBeCalled();
    expect(taskService.getCompletedTaskList).toBeCalled();
    expect(taskService.deleteCompleted).toBeCalled();
    expect(taskService.deleteCompleted).toBeCalledWith([1,2,3]);

  })

});
