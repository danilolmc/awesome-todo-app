import { NgModule } from '@angular/core';
import { TaskItemComponent } from './task-item.component';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@NgModule({
  declarations: [TaskItemComponent],
  exports: [TaskItemComponent],
  imports: [CommonModule, CheckboxModule]
})
export class TaskItemModule{}
