import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task !: Task;

  isSelected = false;

  @ViewChild('checkbox') checkbox !: CheckboxComponent;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.task.status == 'completed' ? this.isSelected = true : false;
  }

  selectedData(statusCheckbox: boolean) {

    this.isSelected = statusCheckbox;
    this.toggleCompleteTask()
  }


  CompleteTaskByClickingAtItName(event: Event) {

    this.isSelected = !this.isSelected;
    this.toggleCompleteTask();
  }

  toggleCompleteTask() {
    setTimeout(() => {
      this.isSelected
        ? this.taskService.setTaskAsCompleted(this.task.id)
        : this.taskService.unsetTaskAsCompleted(this.task.id)
    }, 500);
  }

  deleteTask() {

    this.taskService
      .deleteTask(this.task.id)
      .subscribe(() => this.taskService.deleteTaskEventEmitter.emit())
      .unsubscribe();

  }

}
