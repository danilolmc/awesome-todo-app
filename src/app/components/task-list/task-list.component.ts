import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../core/TaskList';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/Task';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit,TaskList {

  taskList$!: Observable<Task[]>

  constructor(private taskService: TaskList) { }

  getTaskList(): Observable<Task[]> {

    return this.taskService.getTaskList()
  }

  ngOnInit(): void {

    this.taskList$ = this.getTaskList();
  }

}
