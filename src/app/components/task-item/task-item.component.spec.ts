import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import { SelectTaskDirective } from 'src/app/shared/directives/select-task/select-task.directive';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TaskItemComponent } from './task-item.component';


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
  deleteTaskEventEmitter: { emit: jest.fn().mockReturnValue(undefined) },
  setTaskAsCompleted: jest.fn(id => id).mockReturnValue(of({})),
  unsetTaskAsCompleted: jest.fn(id => id).mockReturnValue(of({}))
}


describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskItemComponent, CheckboxComponent, SelectTaskDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TasksService, useValue: taskService },

      ]
    })
      .compileComponents()
      .then((data) => {
        fixture = TestBed.createComponent(TaskItemComponent);
        component = fixture.componentInstance;
        component.task = taskList[0];
        fixture.detectChanges();
      })
      .catch(() => { })
  }));


  it('should create', () => {

    expect(component).toBeTruthy();
    expect(component.isSelected).toBeFalsy()
  });

  test('should delete a task', async () => {

    const spyDelete = jest.spyOn(component, 'deleteTask');

    await component.deleteTask(2);

    expect(spyDelete).toBeCalledTimes(1);
    expect(taskService.deleteTask).toBeCalledWith(2);
    expect(taskService.deleteTaskEventEmitter.emit).toBeCalledTimes(1);

  })

  test('should complete task when click at item', () => {

    const spyCompleteTaskByClickingAtItName = jest.spyOn(component, 'CompleteTaskByClickingAtItName');

    component.CompleteTaskByClickingAtItName();

    expect(spyCompleteTaskByClickingAtItName).toBeCalledTimes(1);

  })

  test('should call setTaskAsCompleted when isSelect is true', () => {

    const spytoggleCompleteTask = jest.spyOn(component, 'toggleCompleteTask');

    component.isSelected = true;

    component.toggleCompleteTask();

    expect(spytoggleCompleteTask).toBeCalledTimes(1);
    expect(taskService.setTaskAsCompleted).toBeCalled();

  })

  test('should call unsetTaskAsCompleted when isSelect is true', () => {

    const spytoggleCompleteTask = jest.spyOn(component, 'toggleCompleteTask');

    component.isSelected = false;

    component.toggleCompleteTask();

    expect(spytoggleCompleteTask).toBeCalledTimes(1);
    expect(taskService.unsetTaskAsCompleted).toBeCalled();

  })

  test('should call selectedCheckbox at checkbox eventemitter', () => {

    const spyselectedCheckbox = jest.spyOn(component, 'selectedCheckbox');

    const spytoggleCompleteTask = jest.spyOn(component, 'toggleCompleteTask');

    component.selectedCheckbox(true);

    expect(component.isSelected).toBeTruthy();
    expect(spytoggleCompleteTask).toBeCalled();
    expect(spyselectedCheckbox).toBeCalledTimes(1);
  })

});
