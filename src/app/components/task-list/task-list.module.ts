import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TaskItemModule } from '../task-item/task-item.module';
import { TaskListComponent } from './task-list.component';

@NgModule({
  declarations: [TaskListComponent],
  exports: [TaskListComponent],
  imports: [
    CommonModule,
    TaskItemModule,
    DragDropModule
  ]
})
export class TaskListModule { }
