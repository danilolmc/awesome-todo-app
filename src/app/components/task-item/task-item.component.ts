import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {

  @Input() task !: Task;

  isSelected = false;

  @ViewChild('checkbox') checkbox !: CheckboxComponent;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {

    const taskIsCompleted = this.task.status === 'completed';

    if (taskIsCompleted) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }

  selectedCheckbox(statusCheckbox: boolean): void {

    this.isSelected = statusCheckbox;
    this.toggleCompleteTask();
  }

  CompleteTaskByClickingAtItName(): void {

    this.checkbox.toggleCheckBox();
  }

  toggleCompleteTask(): void {

    this.isSelected
      ? this.taskService.setTaskAsCompleted(this.task.id)
      : this.taskService.unsetTaskAsCompleted(this.task.id);
  }

  deleteTask(id: number): Promise<any> {

    return this.taskService
      .deleteTask(id)
      .toPromise()
      .then(() => {
        this.taskService.deleteTaskEventEmitter.emit();
      });

  }

}
