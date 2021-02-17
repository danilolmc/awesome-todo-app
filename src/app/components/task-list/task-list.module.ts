import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TaskItemModule } from '../task-item/task-item.module';
import { TaskListComponent } from './task-list.component';
import { DragDropModule } from "@angular/cdk/drag-drop"

@NgModule({
  declarations: [TaskListComponent],
  exports: [TaskListComponent],
  imports: [
    CommonModule,
    TaskItemModule,
    BrowserAnimationsModule,
    DragDropModule
  ]
})
export class TaskListModule { }
