import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTaskComponent } from './input-task.component';
import { ReactiveFormsModule } from "@angular/forms"
import { CheckboxComponent } from '../checkbox/checkbox.component';


@NgModule({
  declarations: [InputTaskComponent, CheckboxComponent],
  exports: [InputTaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class InputTaskModule { }
