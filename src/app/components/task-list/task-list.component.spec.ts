import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { from } from 'rxjs';
import { Task } from 'src/app/core/Task';

import { TasksService } from "../../services/tasks-service/tasks-service.service";
import { TaskList } from 'src/app/core/TaskList';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const taskList: Task[] = [
    {
      id: 0,
      description: "MyTask",
      status: 'active'
    }
  ]

  const taskService : TaskList = {

    getTaskList: jest.fn().mockReturnValue(from(taskList))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        TasksService,
        {
          provide: TasksService, useValue: taskService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should retrieve task list', () => {

    const retrievedTaskList = taskService.getTaskList();

    const spyGetTaskFunction = jest.spyOn(taskService, 'getTaskList');
    // const spyComponentGetTaskFunction = jest.spyOn(component, 'getTaskList');

    expect(retrievedTaskList).toBeDefined();
    expect(spyGetTaskFunction).toBeCalledTimes(1)

  })
});
