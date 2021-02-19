import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { trigger, transition, style, query, animate } from '@angular/animations';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {

  @Input() task !: Task;

  isSelected = false;

  @ViewChild('checkbox') checkbox !: CheckboxComponent;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.task.status == 'completed' ? this.isSelected = true : false;
  }

  selectedCheckbox(statusCheckbox: boolean) {

    this.isSelected = statusCheckbox;
    this.toggleCompleteTask()
  }

  CompleteTaskByClickingAtItName() {

    this.checkbox.toggleCheckBox()
  }

  toggleCompleteTask() {

    this.isSelected
      ? this.taskService.setTaskAsCompleted(this.task.id)
      : this.taskService.unsetTaskAsCompleted(this.task.id)
  }

  deleteTask(id: number) {

    return this.taskService
      .deleteTask(id)
      .toPromise()
      .then(() => {
        this.taskService.deleteTaskEventEmitter.emit()
      })

  }

}
