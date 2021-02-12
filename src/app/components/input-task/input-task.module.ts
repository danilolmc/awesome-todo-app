import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTaskComponent } from './input-task.component';
import { ReactiveFormsModule } from "@angular/forms"
import { CheckboxModule } from '../checkbox/checkbox.module';


@NgModule({
  declarations: [InputTaskComponent],
  exports: [InputTaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxModule
  ]
})
export class InputTaskModule { }
