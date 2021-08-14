import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectTaskDirective } from 'src/app/shared/directives/select-task/select-task.directive';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { TaskItemComponent } from './task-item.component';

@NgModule({
  declarations: [TaskItemComponent, SelectTaskDirective],
  exports: [TaskItemComponent],
  imports: [CommonModule, CheckboxModule]
})
export class TaskItemModule { }
