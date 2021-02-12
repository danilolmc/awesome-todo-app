import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ThemeDirective } from './shared/directives/theme/theme.directive';
import { InputTaskModule } from './components/input-task/input-task.module';
import { TaskListComponent } from './components/task-list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeDirective,
    TaskListComponent,
  ],
  imports: [
    BrowserModule,
    InputTaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
