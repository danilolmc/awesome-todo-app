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
export class InputTaskComponent implements OnInit {

  inputTaskControl: FormControl = new FormControl('', Validators.required);

  @Output() addedTask: EventEmitter<any> = new EventEmitter();

  @ViewChild("checkbox") checkbox !: CheckboxComponent;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
  }

  addNewTask(event: Event) {

    const newTask: Task = {
      id: new Date().getMilliseconds(),
      description: this.inputTaskControl.value,
      status: this.checkbox.isSelected ? 'completed' : 'active'
    };


    this.getReadyToAdd(event) && this.taskService.addNewTask(newTask)

  }

  getReadyToAdd(event : Event){

    return this.valitadeField() && (event as KeyboardEvent).key == 'Enter';

  }

  valitadeField() {

    return this.inputTaskControl.valid;
  }

}
