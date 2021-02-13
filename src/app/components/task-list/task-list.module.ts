import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { TaskItemModule } from '../task-item/task-item.module';
import { TasksService } from 'src/app/services/tasks-service/tasks-service.service';
import {TaskList} from "../../core/TaskList"
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [TaskListComponent],
  exports: [TaskListComponent],
  imports: [
    CommonModule,
    TaskItemModule,
  ]
})
export class TaskListModule { }
