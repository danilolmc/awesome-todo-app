import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { InputTaskModule } from 'src/app/components/input-task/input-task.module';
import { TaskListModule } from 'src/app/components/task-list/task-list.module';
import { ThemeDirective } from 'src/app/shared/directives/theme/theme.directive';
import { TodoListComponent } from './todo-list.component';
import { TodoListRoutingModule } from './todo-list.routing.module';



@NgModule({
  declarations: [
    TodoListComponent,
    ThemeDirective
  ],
  exports: [TodoListComponent],
  imports: [
    CommonModule,
    InputTaskModule,
    TaskListModule,
    CheckboxModule,
    TodoListRoutingModule
  ]
})
export class TodoListModule { }
