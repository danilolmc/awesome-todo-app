import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ThemeDirective } from './shared/directives/theme/theme.directive';
import { InputTaskModule } from './components/input-task/input-task.module';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeDirective,
    CheckboxComponent,
  ],
  imports: [
    BrowserModule,
    InputTaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
