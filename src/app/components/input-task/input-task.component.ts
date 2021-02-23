import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'input-task',
  templateUrl: './input-task.component.html',
  styleUrls: ['./input-task.component.css']
})
export class InputTaskComponent {

  inputTaskControl: FormControl = new FormControl('', Validators.required);

  @Output() addedTask: EventEmitter<any> = new EventEmitter();

  @ViewChild("checkbox") checkbox !: CheckboxComponent;

  constructor(private taskService: TasksService) { }

  addNewTask() {

    const newTask: Task = {
      id: new Date().getMilliseconds(),
      description: this.inputTaskControl.value,
      status: this.checkbox.isSelected ? 'completed' : 'active'
    };

    this.valitadeField() && this.taskService.addNewTask(newTask)

  }

  valitadeField() {

    return this.inputTaskControl.valid;
  }

}
