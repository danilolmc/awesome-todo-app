import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { TaskItemModule } from '../task-item/task-item.module';



@NgModule({
  declarations: [TaskListComponent],
  exports: [TaskListComponent],
  imports: [
    CommonModule,
    TaskItemModule
  ]
})
export class TaskListModule { }
