import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTaskComponent } from './input-task.component';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

describe('InputSearchComponent', () => {
  let component: InputTaskComponent;
  let fixture: ComponentFixture<InputTaskComponent>;
  let inputTask : FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTaskComponent]
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

    expect(inputTask.valid).toBeTruthy();
  })

  test('should invalidate adding action if task field is invalid', () => {

    inputTask.setValue('')

    expect(inputTask.valid).toBeFalsy();
  })

  test('should add task to service if keydown is \'enter\' and task input is valid', () => {

    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    let keyDownEvent = new KeyboardEvent('keydown', {'key': 'enter'})

    inputTask.setValue('My new Task');

    input.addEventListener('keydown', (event :  KeyboardEvent) =>{
      console.log(event.key);

      expect(event.key).toBe('enter');
    })

    input.dispatchEvent(keyDownEvent);

    console.log(inputTask.valid);

    expect(inputTask.valid).toBeTruthy();

    // expect(component.addNewTask() ).toBeCalledTimes(2)

  })
});
