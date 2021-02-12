import { NgModule } from '@angular/core';
import { TaskItemComponent } from './task-item.component';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SelectTaskDirective } from 'src/app/shared/directives/select-task/select-task.directive';

@NgModule({
  declarations: [TaskItemComponent,SelectTaskDirective],
  exports: [TaskItemComponent],
  imports: [CommonModule, CheckboxModule]
})
export class TaskItemModule{}
