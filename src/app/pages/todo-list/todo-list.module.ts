import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { InputTaskModule } from 'src/app/components/input-task/input-task.module';
import { TaskListModule } from 'src/app/components/task-list/task-list.module';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { HttpClientModule } from '@angular/common/http';
import { ThemeDirective } from 'src/app/shared/directives/theme/theme.directive';
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
