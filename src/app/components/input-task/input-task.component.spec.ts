import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTaskComponent } from './input-task.component';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';


const serviceTask = {

  addTask : jest.fn().mockReturnValue(undefined),
}

describe('InputSearchComponent', () => {
  let component: InputTaskComponent;
  let fixture: ComponentFixture<InputTaskComponent>;
  let inputTask: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTaskComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTaskComponent);
    component = fixture.componentInstance;
    inputTask = component.inputTaskControl;
    fixture.detectChanges();
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

    expect(statusField).toBeFalsy();
  })

  test('should add task to service if keydown is \'enter\' and task input is valid', () => {

    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    let keyDownEvent = new KeyboardEvent('keydown', { 'key': 'enter' })

    inputTask.setValue('My new Task');

    input.addEventListener('keydown', (event: KeyboardEvent) => {

      expect(event.key).toBe('enter');
    })

    input.dispatchEvent(keyDownEvent);

    const addNewTask = jest.spyOn(component, 'addNewTask');

    component.addNewTask();

    const statusField = component.valitadeField();

    expect(statusField).toBeTruthy();

    expect(addNewTask).toBeCalledTimes(1)

  })
});
