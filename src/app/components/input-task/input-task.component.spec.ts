import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTaskComponent } from './input-task.component';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

const newTask: Task = {
  id: new Date().getMilliseconds(),
  description: "my task",
  status: 'active'
}

const serviceTask = {

  addNewTask: jest.fn().mockReturnValue(newTask),
}


describe('InputSearchComponent', () => {
  let component: InputTaskComponent;
  let fixture: ComponentFixture<InputTaskComponent>;
  let inputTask: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTaskComponent,CheckboxComponent],
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
        fixture.detectChanges();
      })
      .catch(() => { })
  });


  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('task field should be filled for add task', () => {

    inputTask.setValue('Make walking')

    const fieldIsValid = component.valitadeField();

    expect(fieldIsValid).toBeTruthy();
  })

  test('should invalidate adding action if task field is invalid', () => {

    inputTask.setValue('')

    const statusField = component.valitadeField();

    const addNewTask = jest.spyOn(component, 'addNewTask');

    expect(statusField).toBeFalsy();
    expect(addNewTask).toBeCalledTimes(0);
  })

  test('should add task to service when keydown is \'enter\' and task input is valid', () => {

    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    let keyDownEvent = new KeyboardEvent('keydown', { 'key': 'enter' })

    inputTask.setValue('My new Task');

    input.addEventListener('keydown', (event: KeyboardEvent) => {

      expect(event.key).toBe('enter');
    })

    input.dispatchEvent(keyDownEvent);

    const addNewTask = jest.spyOn(component, 'addNewTask');

    component.addNewTask(keyDownEvent);

    serviceTask.addNewTask();

    const statusField = component.valitadeField();

    expect(statusField).toBeTruthy();

    expect(addNewTask).toBeCalledTimes(1)

    expect(serviceTask.addNewTask).toBeCalled()

  })

  test('should not be ready when input is invalid', () => {

    const spyNotBeReady = jest.spyOn(component, 'getReadyToAdd');

    component.inputTaskControl.setValue('');

    let keyDownEvent = new KeyboardEvent('keydown', { 'key': 'enter' })

    component.getReadyToAdd(keyDownEvent)

    expect(spyNotBeReady).toReturnWith(false);

  })
  test('should not be ready when key is not enter', () => {

    const spyNotBeReady = jest.spyOn(component, 'getReadyToAdd');

    component.inputTaskControl.setValue('task');

    let keyDownEvent = new KeyboardEvent('keydown', { 'key': 'b' })

    component.getReadyToAdd(keyDownEvent)

    expect(spyNotBeReady).toReturnWith(false);

  })


});
