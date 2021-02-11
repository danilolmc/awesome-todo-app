import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTaskComponent } from './input-task.component';
import { ReactiveFormsModule } from "@angular/forms"


@NgModule({
  declarations: [InputTaskComponent],
  exports: [InputTaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class InputTaskModule { }
