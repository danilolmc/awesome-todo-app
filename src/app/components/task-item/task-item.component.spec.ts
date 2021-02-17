import { Component, Directive, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { ThemeDirective } from 'src/app/shared/directives/theme/theme.directive';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/core/Task';
import { SelectTaskDirective } from 'src/app/shared/directives/select-task/select-task.directive';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import { of } from 'rxjs';



@Component({ selector: 'checkbox', template: "<checkbox [taskId]='0' #checkbox></checkbox>" })
class CheckboxMock { }


@Directive({ selector: '[theme]' })
class DirectiveMOck { }

const task: Task =
{
  id: 0,
  description: "MyTask",
  status: 'active'
}

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
  deleteTask: jest.fn(id => id).mockReturnValue(of({})),
  deleteTaskEventEmitter: { emit: jest.fn().mockReturnValue(undefined)}


}


describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskItemComponent, CheckboxComponent, SelectTaskDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: TasksService, useValue: taskService}
      ]
    })
      .compileComponents()
      .then((data) => {
        fixture = TestBed.createComponent(TaskItemComponent);
        component = fixture.componentInstance;
        component.task = taskList[0];
        fixture.detectChanges();
      })
      .catch(() => {})
  }));


  it('should create', () => {

    expect(component).toBeTruthy();
  });

  test('should delete a task', () => {

    const spyDelete = jest.spyOn(component, 'deleteTask');

    component.deleteTask(2);

    expect(spyDelete).toBeCalledTimes(1);
    expect(taskService.deleteTask).toBeCalledWith(2);
    expect(taskService.deleteTaskEventEmitter.emit).toBeCalledTimes(1);

  })
});
