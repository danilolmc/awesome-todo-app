import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CheckboxModule } from './components/checkbox/checkbox.module';
import { InputTaskModule } from './components/input-task/input-task.module';
import { TaskListModule } from './components/task-list/task-list.module';
import { ThemeDirective } from './shared/directives/theme/theme.directive';
import { HttpClientModule } from '@angular/common/http';


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
    CheckboxModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
