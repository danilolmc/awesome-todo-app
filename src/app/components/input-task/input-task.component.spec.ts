import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { InputTaskComponent } from './input-task.component';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

const newTask: Task = {
  id: new Date().getMilliseconds(),
  description: 'my task',
  status: 'active'
};

const serviceTask = {

  addNewTask: jest.fn().mockReturnValue(undefined)
};


describe('InputSearchComponent', () => {
  let component: InputTaskComponent;
  let fixture: ComponentFixture<InputTaskComponent>;
  let inputTask: FormControl;
  let inputDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTaskComponent, CheckboxComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TasksService, useValue: serviceTask }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(InputTaskComponent);
      component = fixture.componentInstance;
      inputTask = component.inputTaskControl;
      inputDebugElement = fixture.debugElement.query(By.css('.input-task'));
      fixture.detectChanges();
      })
      .catch(() => { });
  });


  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should invalidate adding action if task input is invalid', () => {

    inputTask.setValue('');

    const statusValidField = component.valitadeField();

    inputDebugElement.triggerEventHandler('keydown.enter', {});

    fixture.detectChanges();

    expect(statusValidField).toBeFalsy();
    expect(serviceTask.addNewTask).toBeCalledTimes(0);

  });

  test('should add task to service only when keydown key is \'enter\' and input is valid', () => {

    inputTask.setValue('Make walking');

    const addNewTask = jest.spyOn(component, 'addNewTask');

    inputDebugElement.triggerEventHandler('keydown.enter', {});


    fixture.detectChanges();

    expect(addNewTask).toBeCalledTimes(1);
    expect(serviceTask.addNewTask).toBeCalledTimes(1);
    expect(component.valitadeField()).toBeTruthy();

  });
});
