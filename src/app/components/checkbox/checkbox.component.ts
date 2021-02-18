import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent{

  @Input() taskId : string = "checkbox";

  @Input() isSelected = false;

  @Output() selectTask = new EventEmitter<boolean>(this.isSelected);

  constructor() { }

  toggleCheckBox(){

    this.isSelected = !this.isSelected;
    this.selectTask.emit(this.isSelected);
  }
}
