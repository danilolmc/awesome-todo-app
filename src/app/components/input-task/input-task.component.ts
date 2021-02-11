import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'input-task',
  templateUrl: './input-task.component.html',
  styleUrls: ['./input-task.component.css']
})
export class InputTaskComponent implements OnInit {

  inputTaskControl : FormControl =  new FormControl('', Validators.required);

  constructor() { }

  ngOnInit(): void {
  }

  addNewTask(){

    this.valitadeField() && console.log("campo valido")
  }

  valitadeField(){

    return this.inputTaskControl.valid;
  }

}
