import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/Task';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  // animations: [
  //   trigger('taskListAnimation', [

  //     transition("* => *", [
  //       query(":enter", [
  //         style({ opacity: 0 }),
  //         animate('1.2s  ease', style({ opacity: 1 }))
  //       ])
  //     ])
  //   ])]
})
export class TaskListComponent implements OnInit {

  taskList$!: Observable<Task[]>

  constructor(private taskService: TasksService) { }

  getTaskList() {

    this.taskList$ = this.taskService.getTaskList()
  }

  getActiveTaskList() {

    this.taskList$ = this.taskService.getActiveTaskList()
  }

  getCompletedTaskList() {

    this.taskList$ = this.taskService.getCompletedTaskList()
  }

  ngOnInit(): void {

    this.getTaskList();
  }


}
