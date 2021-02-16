import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import { Task } from 'src/app/core/Task';
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

  addNewTask(event: KeyboardEvent) {

    const newTask: Task = {
      id: new Date().getMilliseconds(),
      description: this.inputTaskControl.value,
      status: this.checkbox.isSelected ? 'completed' : 'active'
    };

    const readyToAdd = this.valitadeField() && event.key == 'Enter';


    readyToAdd
      && this.taskService
        .addNewTask(newTask)
        .subscribe(task => {
          setTimeout(() => {
            !!task && this.addedTask.emit()
          }, 500)
        });


  }

  valitadeField() {

    return this.inputTaskControl.valid;
  }

}
