import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ThemeDirective } from './shared/directives/theme/theme.directive';
import { InputTaskModule } from './components/input-task/input-task.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListModule } from './components/task-list/task-list.module';
import { CheckboxModule } from './components/checkbox/checkbox.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ThemeDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    InputTaskModule,
    TaskListModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
